import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from "axios";
import { API_URL } from "../../../utils/utils";

const NovoPodjetje = () => {

  const [tempPodjetje, setTempPodjetje] = useState({
    naziv: '',
    admin: '',
    geslo: '',
    potrdiGeslo: '',
    naslov: '',
    slika: ''
  });

  const [tempDelavec, setTempDelavec] = useState({
    ime: '',
    priimek: '',
    slika: '',
    eposta: '',
    geslo: '',
    potrdiGeslo: '',
    telefon: ''
  });

  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (setter, object, name) => (event) => {
    setter({ ...object, [name]: event.target.value });
  }

  useEffect(() => {
    setIsValid(
      // all atributtes are not empty
      Object.values(tempPodjetje).every((el) => Boolean(el)) &&
      Object.values(tempDelavec).every((el) => Boolean(el))
    );
  }, [tempPodjetje, tempDelavec]);

  const dodajDelavca = async (idPodjetje) => {
    axios.post(API_URL + '/auth/delavec/registracija', {
      delavec_ime: tempDelavec.ime,
      delavec_priimek: tempDelavec.priimek,
      delavec_slika: tempDelavec.slika,
      delavec_eposta: tempDelavec.eposta,
      delavec_geslo: tempDelavec.geslo,
      delavec_telefon: tempDelavec.telefon,
      podjetje_id: idPodjetje
    }, {
      withCredentials: true,
      timeout: 20000
    }
    ).then((response) => {
      if (response.status === 200) {
        alert("Registracija uspešna! Prosimo, da se prijavite.")
        navigate('/prijava/delavec');
      }
      else {
        setErrorMessage('Registracija delavca neuspešna.');
      }
    }).catch((error) => {
      setErrorMessage('Registracija delavca neuspešna.');
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (tempPodjetje.geslo.length < 8) {
      setErrorMessage('Dolžina gesla mora biti vsaj 8 znakov.');
      return;
    }

    if (tempPodjetje.geslo !== tempPodjetje.potrdiGeslo) {
      setErrorMessage('Gesli nista enaki.');
      return;
    }

    axios.post(API_URL + '/auth/podjetje/registracija', {
      podjetje_naziv: tempPodjetje.naziv,
      podjetje_admin: tempPodjetje.admin,
      podjetje_geslo: tempPodjetje.geslo,
      podjetje_naslov: tempPodjetje.naslov,
      podjetje_slika: tempPodjetje.slika
    }, {
      withCredentials: true,
      timeout: 20000
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.podjetje.insertId) {
          dodajDelavca(response.data.podjetje.insertId);
        }
        else {
          alert("Ne dobimo idja od novega podjetja")
        }
      }
      else {
        setErrorMessage('Registracija podjetja neuspešna.');
      }
    }
    ).catch((error) => {
      setErrorMessage('Registracija podjetja neuspešna.');
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">Registracija novega podjetja</Card.Title>
              <Form onSubmit={handleSubmit}>
                {/* <Container> */}
                {/* <Row> */}
                {/* <Col> */}
                <Form.Group className="mb-3">
                  <Form.Label>Naziv</Form.Label>
                  <Form.Control id="naslovPodjetje" type="text" placeholder="Terminček" value={tempPodjetje.naziv} onChange={handleInputChange(setTempPodjetje, tempPodjetje, "naziv")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Naslov</Form.Label>
                  <Form.Control id="naslovPodjetje" type="text" placeholder="Ulica 1, 1000 Mesto, Slovenija" value={tempPodjetje.naslov} onChange={handleInputChange(setTempPodjetje, tempPodjetje, "naslov")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Uporabniško ime</Form.Label>
                  <Form.Control id="adminPodjetje" type="text" placeholder="terminator" value={tempPodjetje.admin} onChange={handleInputChange(setTempPodjetje, tempPodjetje, "admin")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Geslo</Form.Label>
                  <Form.Control id="gesloPodjetje" type="password" placeholder="Vnesite geslo" value={tempPodjetje.geslo} onChange={handleInputChange(setTempPodjetje, tempPodjetje, "geslo")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Potrdi geslo</Form.Label>
                  <Form.Control id="potrdiGesloPodjetje" type="password" placeholder="Ponovno vnesite geslo" value={tempPodjetje.potrdiGeslo} onChange={handleInputChange(setTempPodjetje, tempPodjetje, "potrdiGeslo")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Slika</Form.Label>
                  <Form.Control id="slikaPodjetje" placeholder="https://domena.com/slika.jpg" value={tempPodjetje.slika} onChange={handleInputChange(setTempPodjetje, tempPodjetje, "slika")} />
                </Form.Group>
                {/* </Col> */}

                <hr className="my-4" />

                {/* <Col> */}
                <Card.Title className="mb-4">Registracija novega delavca</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="ime">Ime</Form.Label>
                  <Form.Control id="imeDelavec" type="text" placeholder="Janez" value={tempDelavec.ime} onChange={handleInputChange(setTempDelavec, tempDelavec, "ime")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="priimek">Priimek</Form.Label>
                  <Form.Control id="priimek" type="text" placeholder="Novak" value={tempDelavec.priimek} onChange={handleInputChange(setTempDelavec, tempDelavec, "priimek")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="slikaDelavec">Slika</Form.Label>
                  <Form.Control id="slikaDelavec" placeholder="https://domena.com/slika.jpg" value={tempDelavec.slika} onChange={handleInputChange(setTempDelavec, tempDelavec, "slika")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="eposta">E-pošta</Form.Label>
                  <Form.Control id="epostaDelavec" type="email" placeholder="zaposlen@termin.cek" value={tempDelavec.eposta} onChange={handleInputChange(setTempDelavec, tempDelavec, "eposta")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="gesloDelavec">Geslo</Form.Label>
                  <Form.Control id="gesloDelavec" type="password" placeholder="Vnesite geslo" value={tempDelavec.geslo} onChange={handleInputChange(setTempDelavec, tempDelavec, "geslo")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="potrdiGesloDelavec">Potrdi geslo</Form.Label>
                  <Form.Control id="potrdiGesloDelavec" type="password" placeholder="Ponovno vnesite geslo" value={tempDelavec.potrdiGeslo} onChange={handleInputChange(setTempDelavec, tempDelavec, "potrdiGeslo")} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="telefon">Telefon</Form.Label>
                  <Form.Control id="telefonDelavec" type="tel" placeholder="040 123 456" value={tempDelavec.telefon} onChange={handleInputChange(setTempDelavec, tempDelavec, "telefon")} />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3" disabled={!isValid}>Registracija</Button>
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                {/* </Col> */}
                {/* </Row> */}
                {/* </Container> */}

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NovoPodjetje;