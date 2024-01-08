import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

import { StrankaContext } from "../../../contexts/contexts";

function EnoNarocilo({ narocilo, prekliciNarocilo }) {
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
            <Button className='mt-3' variant="danger" onClick={() => prekliciNarocilo(narocilo.narocilo_id)}>Prekliči naročilo</Button>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Profil() {

  const { stranka } = useContext(StrankaContext);

  const [narocila, setNarocila] = useState([]);

  useEffect(() => {
    const fetchNarocila = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/narocila/${stranka.stranka_id}`);
        setNarocila(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNarocila();
  }, [stranka.stranka_id]);

  const prekliciNarocilo = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/narocilo/preklici`, { data: { narocilo_id: id } });
      const newNarocila = narocila.filter(narocilo => narocilo.narocilo_id !== id);
      setNarocila(newNarocila);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>{stranka.stranka_ime} {stranka.stranka_priimek}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{stranka.stranka_eposta}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mt-4'>
        <h2>Moja naročila</h2>
        {narocila.length === 0 ? (
          <p>Trenutno nimate nobenega naročila</p>
        ) : (
          narocila.map(narocilo => <EnoNarocilo narocilo={narocilo} prekliciNarocilo={prekliciNarocilo} />)
        )}
      </Row>
    </Container>
  );
}

export default Profil