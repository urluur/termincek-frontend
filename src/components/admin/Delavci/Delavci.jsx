import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { PodjetjeContext, ZaposleniContext } from "../../../contexts/contexts";

import Loading from "../../Loading/Loading";
import { API_URL } from "../../../utils/utils";

const Delavci = () => {

  const { zaposleni, setZaposleni } = useContext(ZaposleniContext);
  const { podjetje } = useContext(PodjetjeContext);

  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();

  // pridobi vse delavce
  useEffect(() => {
    axios.get(API_URL + `/api/delavci/${podjetje.podjetje_id}`)
      .then(response => {
        setZaposleni(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [podjetje, setZaposleni]);

  const deleteDelavec = (id) => {
    axios.delete(API_URL + `/api/delavec`, { // TODO: backand: more biti admin in isto podjetje
      data: {
        target_delavec_id: id
      }
    }, {
      withCredentials: true,
      timeout: 20000
    })
      .then(response => {
        setZaposleni(zaposleni.filter(delavec => delavec.delavec_id !== id));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const deletePodjetje = () => {
    axios.delete(API_URL + `/api/podjetje`, { // TODO: backand: more biti admin in isto podjetje
      data: {
        target_podjetje_id: podjetje.podjetje_id
      }
    }, {
      withCredentials: true,
      timeout: 20000
    })
      .then(response => {
        alert("Podjetje je bilo uspešno izbrisano!")
        navigate('/odjava-delavec')
      }
      )
      .catch(error => {
        console.error('Error:', error);
      }
      );
  }

  const editDelavec = (id) => {
    // navigate(`/uredi/delavec/${id}`); // TODO: naredi file in route
  }

  if (!zaposleni) {
    return <Loading />
  }
  return (
    <Container>
      <Row className="align-items-center my-3">
        <Col md={8} sm={7} xs={8}>
          <h1>Delavci</h1>
        </Col>
        <Col md={4} sm={5} xs={4} className="d-flex justify-content-end">
          <Button variant="success" size="lg" onClick={() => navigate('/registracija/delavec')}>Dodaj delavca</Button>
        </Col>
      </Row>
      <Row>
        {zaposleni.map((delavec) => (
          <Col xs={6} md={5} lg={4} key={delavec.delavec_id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Image variant="top" src={delavec.delavec_slika} alt={delavec.delavec_ime} onLoad={() => setImageLoaded(true)} />
              {!imageLoaded && <Loading />}
              <Card.Body>
                <Card.Title>{delavec.delavec_ime} {delavec.delavec_priimek}</Card.Title>
                <Card.Text>
                  <p>{delavec.delavec_eposta}</p>
                  <p>{delavec.delavec_telefon}</p>
                </Card.Text>
                <Row className="mt-3">
                  <Col xs={6}>
                    <Button variant="success" disabled="true" block onClick={() => editDelavec(delavec.delavec_id)}>Uredi podatke</Button>
                  </Col>
                  <Col xs={6}>
                    {
                      zaposleni.length === 1 ?
                        <Button variant="danger" onClick={() => deletePodjetje()}>Izbriši podjetje</Button>
                        :
                        <Button variant="danger" onClick={() => deleteDelavec(delavec.delavec_id)}>Izbriši delavca</Button>
                    }
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container >
  );
}

export default Delavci;