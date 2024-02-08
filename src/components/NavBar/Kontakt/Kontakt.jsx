import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col, Image, ListGroup } from 'react-bootstrap';

import { ZaposleniContext } from "../../../contexts/contexts";

import Loading from "../../Loading/Loading";
import { API_URL } from "../../../utils/utils";

const Kontakt = () => {

  const { zaposleni, setZaposleni } = useContext(ZaposleniContext);

  const { podjetje_id } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    axios.get(API_URL + `/api/delavci/${podjetje_id}`)
      .then(response => {
        setZaposleni(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [podjetje_id, setZaposleni]);

  if (!zaposleni) {
    return <Loading />
  }
  return (
    <Container>
      <h1 className="my-4">Kontakti</h1>
      <Row>
        {zaposleni.map((delavec) => (
          <Col xs={6} md={4} lg={3} key={delavec.delavec_id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Image variant="top" src={delavec.delavec_slika} alt={delavec.delavec_ime} onLoad={() => setImageLoaded(true)} />
              {!imageLoaded && <Loading />}
              <Card.Body>
                <Card.Title>{delavec.delavec_ime} {delavec.delavec_priimek}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="px-0">{delavec.delavec_eposta}</ListGroup.Item>
                  <ListGroup.Item className="px-0">{delavec.delavec_telefon}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))
        }
      </Row >
    </Container >
  );
}

export default Kontakt;