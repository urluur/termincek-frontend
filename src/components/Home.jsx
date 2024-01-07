import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading/Loading';

function Home(props) {
  const [podjetja, setPodjetja] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5050/podjetja')
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

  props.setPodjetje({
    chosen: false,
    podjetje_id: "",
    podjetje_naziv: "",
    podjetje_naslov: "",
    podjetje_slika: "",
    storitve: []
  });

  props.setNarocilo({
    potrditev: false,
    cas_potrditev: false,
    narocilo_cas: "",
    narocilo_opombe: "",
    storitev_id: "",
    stranka_id: "",
    delavec_id: ""
  });

  props.setStoritev({
    potrditev: false,
    storitev_id: "",
    storitev_ime: "",
    storitev_opis: "",
    storitev_slika: "",
    storitev_trajanje: "",
    storitev_cena: ""
  });

  props.setDelavci([
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
    <Container className='mt-5'>
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