import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';

import { StrankaContext } from "../../../contexts/contexts";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../utils/utils';

import Cookie from "universal-cookie";
const cookie = new Cookie();

function EnoNarocilo({ narocilo, openPrekliciNarociloModal }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} key={narocilo.narocilo_id}>
      <Card className='mt-2' style={{ 'width': '100%' }}>
        <Card.Body>
          <Card.Title>{narocilo.storitev_ime}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{narocilo.delavec_ime} {narocilo.delavec_priimek}</Card.Subtitle>
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

function Profil() {

  const { stranka, setStranka } = useContext(StrankaContext);

  const [narocila, setNarocila] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', body: '', confirmAction: () => { } });

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    axios.delete(API_URL + `/stranka`, {
      withCredentials: true,
      timeout: 20000
    })
      .then(response => {
        if (response.status === 200) {
          setStranka({
            loggedIn: false,
            stranka_id: "",
            stranka_ime: "",
            stranka_priimek: "",
            stranka_eposta: ""
          });
          cookie.remove('stranka_eposta');
          cookie.remove('stranka_geslo');
          setShowModal(false);
          navigate('/prijava');
        }
        else {
          alert("Napaka pri brisanju računa")
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    const fetchNarocila = async () => {
      try {
        axios.get(API_URL + `/stranka/narocila`, {
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
  }, [stranka.stranka_id]);

  const prekliciNarocilo = async (id) => {
    try {
      await axios.delete(API_URL + `/narocilo/preklici`,
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

  const openIzbrisiRacunModal = () => {
    setModalConfig({
      title: 'Potrdite izbris računa',
      body: 'Ali ste prepričani, da želite izbrisati vaš uporabniški račun? Vaša naročila bodo preklicana. Tega dejanja ni mogoče razveljaviti.',
      confirmAction: handleDeleteAccount
    });
    setShowModal(true);
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
      <Row>
        <Col xs={12}>
          <Card style={{ width: '100%' }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>{stranka.stranka_ime} {stranka.stranka_priimek}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{stranka.stranka_eposta}</Card.Subtitle>
              </div>
              <Button variant="danger" onClick={openIzbrisiRacunModal}>Izbriši račun</Button>
            </Card.Body>
          </Card>

        </Col>
      </Row>

      <Row className='mt-4'>
        <h2>Moja naročila</h2>
        {
          narocila.length === 0 ?
            (<p>Trenutno nimate nobenega naročila</p>) :
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

export default Profil