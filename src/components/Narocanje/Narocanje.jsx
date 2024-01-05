import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import IzbiraStoritve from '../IzbiraStoritve/IzbiraStoritve';

function Narocanje(props) {

  const { podjetje_id } = useParams();
  const navigate = useNavigate();

  if (!props.podjetje.chosen) {
    axios.get(`http://localhost:5050/podjetje/${podjetje_id}`)
      .then(response => {
        const tempPodjetje = response.data[0];
        props.setPodjetje({
          chosen: true,
          podjetje_id: tempPodjetje.podjetje_id,
          podjetje_naziv: tempPodjetje.podjetje_naziv,
          podjetje_naslov: tempPodjetje.podjetje_naslov,
          podjetje_slika: tempPodjetje.podjetje_slika
        }
        );
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/');
      }
      );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <div style={{
              backgroundImage: `url(${props.podjetje.podjetje_slika})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '150px',
              width: '100%'
            }} />
            <Card.Body>
              <Card.Title className='mb-3'>{props.podjetje.podjetje_naziv}</Card.Title>
              <IzbiraStoritve storitve={props.storitve} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  );
}

export default Narocanje;