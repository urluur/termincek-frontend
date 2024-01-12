import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Cookie from "universal-cookie";
import { API_URL } from "../../../utils/utils";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminContext } from '../../../contexts/contexts';
const cookie = new Cookie();

function PrijavaDelavec() {

  const { setAdmin } = useContext(AdminContext);

  const [eposta, setEposta] = useState('');
  const [geslo, setGeslo] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [zampomniMe, setZapomniMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.get('delavec_eposta') && cookie.get('delavec_geslo')) {
      setEposta(cookie.get('delavec_eposta'));
      setGeslo(cookie.get('delavec_geslo'));
      axios.post(API_URL + '/auth/admin/prijava', {
        eposta: cookie.get('delavec_eposta'),
        geslo: cookie.get('delavec_geslo')
      },
        {
          withCredentials: true,
          timeout: 20000
        }
      )
        .then(response => {
          setEposta(response.data.delavec.delavec_eposta);
          setGeslo(response.data.delavec.delavec_geslo);
          setAdmin({
            loggedIn: true,
            delavec_id: response.data.delavec.delavec_id,
            delavec_ime: response.data.delavec.delavec_ime,
            delavec_priimek: response.data.delavec.delavec_priimek,
            delavec_eposta: response.data.delavec.delavec_eposta
          });
          setShowSuccess(true);
          setShowError(false);
          navigate('/narocila');
        })
        .catch(error => {
          setShowError(true);
          setShowSuccess(false);
        });
    }
  }, [navigate, setAdmin]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL + '/auth/admin/prijava', {
        eposta: eposta,
        geslo: geslo
      },
        {
          withCredentials: true,
          timeout: 20000
        });

      if (zampomniMe) {
        // cookie.set('stranka_eposta', eposta,
        //   {
        //     path: '/',
        //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
        //   });
        // cookie.set('stranka_geslo', geslo,
        //   {
        //     path: '/',
        //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
        //   });
      }


      if (response.data.status.success) {
        setAdmin({
          loggedIn: true,
          delavec_id: response.data.delavec.delavec_id,
          delavec_ime: response.data.delavec.delavec_ime,
          delavec_priimek: response.data.delavec.delavec_priimek,
          delavec_eposta: response.data.delavec.delavec_eposta
        });
        setShowSuccess(true);
        setShowError(false);
        navigate('/narocila');
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
              <Card.Title className="mb-4">Prijava za delavce</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>E-pošta</Form.Label>
                  <Form.Control type="text" placeholder="Vnesite e-pošto" value={eposta} onChange={(e) => { setEposta(e.target.value); handleInputChange(); }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Geslo</Form.Label>
                  <Form.Control type="password" placeholder="Vnestite geslo" value={geslo} onChange={(e) => { setGeslo(e.target.value); handleInputChange(); }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Zapomni me" checked={zampomniMe} onChange={(e) => setZapomniMe(e.target.checked)} />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3" disabled={!eposta || !geslo}>Prijava</Button>
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

export default PrijavaDelavec