import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from "axios";

const Registracija = () => {
  const [ime, setIme] = useState('');
  const [priimek, setPriimek] = useState('');
  const [eposta, setEposta] = useState('');
  const [geslo, setGeslo] = useState('');
  const [potrdiGeslo, setPotrdiGeslo] = useState('');
  const [telefon, setTelefon] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (geslo !== potrdiGeslo) {
      alert('Gesli nista enaki!');
      return;
    }

    try {
      // send data to server
      const response = await axios.post('http://localhost:3001/uporabniki/registracija', {
        ime: ime,
        priimek: priimek,
        eposta: eposta,
        geslo: geslo,
        telefon: telefon
      });

      if (response.status === 200) {
        // TODO: go home with react history
        window.location.href = '/';
      }
      else {
        alert('Registracija neuspešna!');
      }
    } catch (error) {
      console.error("Error: ", error);
      alert('Registracija neuspešna!');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Registracija</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Ime</Form.Label>
                  <Form.Control type="text" placeholder="Samo" value={ime} onChange={(e) => setIme(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Priimek</Form.Label>
                  <Form.Control type="text" placeholder="Primer" value={priimek} onChange={(e) => setPriimek(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>E-pošta</Form.Label>
                  <Form.Control type="email" placeholder="Vnesite e-pošto" value={eposta} onChange={(e) => setEposta(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Geslo</Form.Label>
                  <Form.Control type="password" placeholder="Vnesite geslo" value={geslo} onChange={(e) => setGeslo(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Potrdi geslo</Form.Label>
                  <Form.Control type="password" placeholder="Ponovno vnesite geslo" value={potrdiGeslo} onChange={(e) => setPotrdiGeslo(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telefon</Form.Label>
                  <Form.Control type="tel" pattern="[0-9]{3}[- ]?[0-9]{3}[- ]]?[0-9]{3}" placeholder="040-123-456" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3">Registracija</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registracija;