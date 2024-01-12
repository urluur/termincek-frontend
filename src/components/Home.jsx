import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading/Loading';
import { PodjetjeContext, NarociloContext, StoritevContext, DelavciContext } from "../contexts/contexts";
import { API_URL } from '../utils/utils';
function Home() {


  const { setPodjetje } = useContext(PodjetjeContext);
  const { setNarocilo } = useContext(NarociloContext);
  const { setStoritev } = useContext(StoritevContext);
  const { setDelavci } = useContext(DelavciContext);

  const [podjetja, setPodjetja] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL + '/podjetja')
      .then(response => {
        setPodjetja(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Loading />);
  }

  setPodjetje({
    chosen: false,
    podjetje_id: "",
    podjetje_naziv: "",
    podjetje_naslov: "",
    podjetje_slika: "",
    storitve: []
  });

  setNarocilo({
    potrditev: false,
    cas_potrditev: false,
    narocilo_cas: "",
    narocilo_opombe: "",
    storitev_id: "",
    stranka_id: "",
    delavec_id: ""
  });

  setStoritev({
    potrditev: false,
    storitev_id: "",
    storitev_ime: "",
    storitev_opis: "",
    storitev_slika: "",
    storitev_trajanje: "",
    storitev_cena: ""
  });

  setDelavci([
    {
      delavec_id: "",
      delavec_ime: "",
      delavec_priimek: "",
      delavec_slika: "",
      delavec_eposta: "",
      delavec_telefon: ""
    }
  ]);


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">
                Izberite <b>Terminček</b>
              </Card.Title>
              <Card.Text>
                Podjetja:
              </Card.Text>
              <ListGroup>
                {podjetja.map(podjetje => (
                  <ListGroup.Item key={podjetje.podjetje_id}>
                    <Link to={`/podjetje/${podjetje.podjetje_id}/narocanje`}> {podjetje.podjetje_naziv} </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default Home;