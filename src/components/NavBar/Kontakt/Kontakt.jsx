import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col, Image } from 'react-bootstrap';

import Loading from "../../Loading/Loading";

const Kontakt = (props) => {

  const { podjetje_id } = useParams();
  const { delavci, setDelavci } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5050/delavci/${podjetje_id}`)
      .then(response => {
        setDelavci(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [podjetje_id, setDelavci]);

  if (!delavci) {
    return <Loading />
  }
  return (
    <Container>
      <h1 className="my-4">Kontakti</h1>
      <Row>
        {delavci.map((delavec) => (
          <Col xs={6} md={4} lg={3} key={delavec.delavec_id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Image variant="top" src={delavec.delavec_slika} alt={delavec.delavec_ime} onLoad={() => setImageLoaded(true)} />
              {!imageLoaded && <Loading />}
              <Card.Body>
                <Card.Title>{delavec.delavec_ime} {delavec.delavec_priimek}</Card.Title>
                <Card.Text>
                  <p>{delavec.delavec_eposta}</p>
                  <p>{delavec.delavec_telefon}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Kontakt;