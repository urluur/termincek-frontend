import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';
import { API_URL } from '../../../utils/utils';
import axios from 'axios';

function EnoNarocilo({ narocilo, openPrekliciNarociloModal }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} key={narocilo.narocilo_id}>
      <Card className='mt-2' style={{ 'width': '100%' }}>
        <Card.Body>
          <Card.Title>{narocilo.storitev_ime}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{narocilo.stranka_ime} {narocilo.stranka_priimek}</Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item className='px-0'>Opis: {narocilo.storitev_opis}</ListGroup.Item>
            <ListGroup.Item className='px-0'>Datum: {new Date(narocilo.narocilo_cas).toLocaleString('sl-SI').split(',')[0]}</ListGroup.Item>
            <ListGroup.Item className='px-0'>Ura: {new Date(narocilo.narocilo_cas).toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
            {narocilo.narocilo_opombe && <ListGroup.Item className='px-0'>Opombe: {narocilo.narocilo_opombe}</ListGroup.Item>}
            <Button className='mt-3' variant="danger" onClick={() => openPrekliciNarociloModal(narocilo.narocilo_id)}>Prekliči naročilo</Button>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Narocila() {

  const [narocila, setNarocila] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', body: '', confirmAction: () => { } });

  useEffect(() => {
    const fetchNarocila = async () => {
      try {
        axios.get(API_URL + `/api/delavec/narocila`, {
          withCredentials: true,
          timeout: 20000
        })
          .then(response => {
            setNarocila(response.data);
          }
          )
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNarocila();
  }, []);

  const prekliciNarocilo = async (id) => {
    try {
      await axios.delete(API_URL + `/api/narocilo/preklici`, // TODO: se ze delauca
        { data: { narocilo_id: id } },
        {
          withCredentials: true,
          timeout: 20000,
        }
      );

      const newNarocila = narocila.filter(narocilo => narocilo.narocilo_id !== id);
      setNarocila(newNarocila);
    } catch (error) {
      console.error('Error:', error);
    }
    setShowModal(false);
  }


  const openPrekliciNarociloModal = (id) => {
    setModalConfig({
      title: 'Potrdite preklic naročila',
      body: 'Ali ste prepričani, da želite preklicati to naročilo?',
      confirmAction: () => prekliciNarocilo(id)
    });
    setShowModal(true);
  }

  return (
    <Container>
      <Row className='mt-4'>
        <h2>Vaša naročila</h2>
        {
          narocila.length === 0 ?
            (<p>Nihče se ni naročil pri vas</p>) :
            (narocila.map(narocilo => (
              <EnoNarocilo
                key={narocilo.narocilo_id}
                narocilo={narocilo}
                openPrekliciNarociloModal={openPrekliciNarociloModal}
              />
            )))
        }
      </Row>

      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={modalConfig.confirmAction}
        title={modalConfig.title}
        body={modalConfig.body}
      />
    </Container>
  );
}

export default Narocila