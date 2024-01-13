import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from "axios";
import { API_URL } from "../../../utils/utils";
import { PodjetjeContext } from "../../../contexts/contexts";

const RegistracijaDelavec = (props) => {

  const { podjetje } = useContext(PodjetjeContext);

  const [ime, setIme] = useState('');
  const [priimek, setPriimek] = useState('');
  const [eposta, setEposta] = useState('');
  const [geslo, setGeslo] = useState('');
  const [potrdiGeslo, setPotrdiGeslo] = useState('');
  const [telefon, setTelefon] = useState('');
  const [slika, setSlika] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (setter) => (event) => {
    setErrorMessage('');
    setter(event.target.value);
  };

  useEffect(() => {
    setIsValid(ime !== '' && eposta !== '' && geslo !== '' && telefon !== '' && slika !== '');
  }, [ime, eposta, geslo, telefon, slika]);

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
      const response = await axios.post(API_URL + '/auth/delavec/registracija', {
        delavec_ime: ime,
        delavec_priimek: priimek,
        delavec_eposta: eposta,
        delavec_geslo: geslo,
        delavec_telefon: telefon,
        delavec_slika: slika,
        podjetje_id: podjetje.podjetje_id
      }, {
        withCredentials: true,
        timeout: 20000
      });

      if (response.status === 200) {
        navigate('/delavci');
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
              <Card.Title className="mb-4">Registracija delavca</Card.Title>
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
                  <Form.Control type="tel" placeholder="040-123-456" value={telefon} onChange={handleInputChange(setTelefon)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Povezava do fotografije</Form.Label>
                  <Form.Control type="text" placeholder="https://domena.com/foto.jpg" value={slika} onChange={handleInputChange(setSlika)} />
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

export default RegistracijaDelavec;