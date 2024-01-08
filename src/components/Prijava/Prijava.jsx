import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from "axios";

import { StrankaContext } from "../../contexts/contexts";


const Prijava = () => {

  const { setStranka } = useContext(StrankaContext);


  const [eposta, setEposta] = useState('');
  const [geslo, setGeslo] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5050/prijava', {
        eposta: eposta,
        geslo: geslo
      });

      if (response.data.status.success) {
        setStranka({
          loggedIn: true,
          stranka_id: response.data.stranka.stranka_id,
          stranka_ime: response.data.stranka.stranka_ime,
          stranka_priimek: response.data.stranka.stranka_priimek,
          stranka_eposta: response.data.stranka.stranka_eposta
        });
        setShowSuccess(true);
        setShowError(false);
        navigate('/');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Error: ", error);
      setShowError(true);
    }
  };

  const handleInputChange = () => {
    setShowError(false);
    setShowSuccess(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Prijava</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>E-pošta</Form.Label>
                  <Form.Control type="text" placeholder="Vnesite e-pošto" value={eposta} onChange={(e) => { setEposta(e.target.value); handleInputChange(); }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Geslo</Form.Label>
                  <Form.Control type="password" placeholder="Vnestite geslo" value={geslo} onChange={(e) => { setGeslo(e.target.value); handleInputChange(); }} />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3" disabled={!eposta || !geslo}>Prijava</Button>
                {showError && <Alert variant="danger" className="mt-3">Prijava neuspešna!</Alert>}
                {showSuccess && <Alert variant="success" className="mt-3">Prijava uspešna!</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Prijava;