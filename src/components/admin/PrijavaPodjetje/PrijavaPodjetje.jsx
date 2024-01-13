// TODO: use to modify za podjetje
import React, { useContext, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { API_URL } from "../../../utils/utils";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DelavecContext, PodjetjeContext } from '../../../contexts/contexts';

function PrijavaPodjetje() {
  const { delavec, setDelavec } = useContext(DelavecContext);
  const { podjetje, setPodjetje } = useContext(PodjetjeContext);

  const [uporabnisko, setUporabnisko] = useState('');
  const [geslo, setGeslo] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL + '/auth/admin/prijava', {
        uporabnisko: uporabnisko,
        geslo: geslo
      },
        {
          withCredentials: true,
          timeout: 20000
        });

      if (response.data.status.success) {
        setDelavec({
          ...delavec,
          isAdmin: true,
        });
        setPodjetje({
          ...podjetje,
          chosen: true,
          podjetje_id: response.data.podjetje.podjetje_id,
          podjetje_naziv: response.data.podjetje.podjetje_naziv,
          podjetje_naslov: response.data.podjetje.podjetje_naslov,
          podjetje_slika: response.data.podjetje.podjetje_slika,
          storitve: response.data.podjetje.storitve
        });
        setShowSuccess(true);
        setShowError(false);
        navigate('/cenik');
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
    <Container>
      <Row className="justify-content-md-center" >
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Prijava za podjetja</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Uporabniško</Form.Label>
                  <Form.Control type="text" placeholder="Vnesite uporabniško ime podjetja" value={uporabnisko} onChange={(e) => { setUporabnisko(e.target.value); handleInputChange(); }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Geslo</Form.Label>
                  <Form.Control type="password" placeholder="Vnestite geslo podjetja" value={geslo} onChange={(e) => { setGeslo(e.target.value); handleInputChange(); }} />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3" disabled={!uporabnisko || !geslo}>Prijava</Button>
                {showError && <Alert variant="danger" className="mt-3">Prijava neuspešna!</Alert>}
                {showSuccess && <Alert variant="success" className="mt-3">Prijava uspešna!</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row >
    </Container >
  );
}


export default PrijavaPodjetje