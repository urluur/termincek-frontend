import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from "axios";
import { API_URL } from "../../utils/utils";

const Registracija = (props) => {

  const [ime, setIme] = useState('');
  const [priimek, setPriimek] = useState('');
  const [eposta, setEposta] = useState('');
  const [geslo, setGeslo] = useState('');
  const [potrdiGeslo, setPotrdiGeslo] = useState('');
  const [telefon, setTelefon] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (setter) => (event) => {
    setErrorMessage('');
    setter(event.target.value);
  };

  useEffect(() => {
    setIsValid(ime !== '' && eposta !== '' && geslo !== '' && telefon !== '');
  }, [ime, eposta, geslo, telefon]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (geslo.length < 8) {
      setErrorMessage('Dolžina gesla mora biti vsaj 8 znakov.');
      return;
    }

    if (geslo !== potrdiGeslo) {
      setErrorMessage('Gesli nista enaki.');
      return;
    }

    try {
      const response = await axios.post(API_URL + '/auth/registracija', {
        ime: ime,
        priimek: priimek,
        eposta: eposta,
        geslo: geslo,
        telefon: telefon
      });

      if (response.status === 200) {
        navigate('/prijava');
      }
      else {
        setErrorMessage('Registracija neuspešna.');
      }
    } catch (error) {
      setErrorMessage('Registracija neuspešna.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">Registracija</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Ime</Form.Label>
                  <Form.Control type="text" placeholder="Samo" value={ime} onChange={handleInputChange(setIme)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Priimek</Form.Label>
                  <Form.Control type="text" placeholder="Primer" value={priimek} onChange={handleInputChange(setPriimek)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>E-pošta</Form.Label>
                  <Form.Control type="email" placeholder="Vnesite e-pošto" value={eposta} onChange={handleInputChange(setEposta)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Geslo</Form.Label>
                  <Form.Control type="password" placeholder="Vnesite geslo" value={geslo} onChange={handleInputChange(setGeslo)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Potrdi geslo</Form.Label>
                  <Form.Control type="password" placeholder="Ponovno vnesite geslo" value={potrdiGeslo} onChange={handleInputChange(setPotrdiGeslo)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telefon</Form.Label>
                  <Form.Control type="tel" pattern="[0-9]{3}[- ]?[0-9]{3}[- ]]?[0-9]{3}" placeholder="040-123-456" value={telefon} onChange={handleInputChange(setTelefon)} />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3" disabled={!isValid}>Registracija</Button>
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registracija;