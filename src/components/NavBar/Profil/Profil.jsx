import axios from 'axios';
import React, { useState } from 'react'
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

function Profil(props) {
  const [narocila, setNarocila] = useState([]);

  axios.get(`http://localhost:5050/narocila/${props.stranka.stranka_id}`)
    .then(response => {
      setNarocila(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    }
    );

  const prekliciNarocilo = (id) => {
    axios.delete(`http://localhost:5050/narocilo/preklici/${id}`)
      .then(response => {
        const newNarocila = narocila.filter(narocilo => narocilo.narocilo_id !== id);
        setNarocila(newNarocila);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>{props.stranka.stranka_ime} {props.stranka.stranka_priimek}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{props.stranka.stranka_eposta}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mt-4'>
        <h2>Moja naročila</h2>
        {narocila.length === 0 ? (
          <p>Trenutno nimate nobenega naročila</p>
        ) : (
          narocila.map(narocilo => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={narocilo.narocilo_id}>
                <Card style={{ width: '100%', marginTop: '10px' }}>
                  <Card.Body>
                    <Card.Title>{narocilo.storitev_ime}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{narocilo.delavec_ime} {narocilo.delavec_priimek}</Card.Subtitle>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Opis: {narocilo.storitev_opis}</ListGroup.Item>
                      <ListGroup.Item>Čas: {narocilo.narocilo_cas}</ListGroup.Item>
                      <ListGroup.Item>Cena: {narocilo.storitev_cena}€</ListGroup.Item>
                      <ListGroup.Item>Opombe: {narocilo.narocilo_opombe}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="danger" onClick={() => prekliciNarocilo(narocilo.narocilo_id)}>Prekliči naročilo</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        )}
      </Row>
    </Container>
  );
}
export default Profil