import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import IzbiraStoritve from './IzbiraStoritve';
import Loading from '../Loading/Loading';

function Narocanje(props) {
  const { podjetje, setPodjetje } = props;
  const { podjetje_id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!podjetje.chosen) {
      axios.get(`http://localhost:5050/podjetje/${podjetje_id}`)
        .then(response => {
          const tempPodjetje = response.data[0];
          setPodjetje({
            podjetje_id: tempPodjetje.podjetje_id,
            podjetje_naziv: tempPodjetje.podjetje_naziv,
            podjetje_naslov: tempPodjetje.podjetje_naslov,
            podjetje_slika: tempPodjetje.podjetje_slika
          });
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoading(false);
          navigate('/');
        }
        );

      axios.get(`http://localhost:5050/storitve/${podjetje_id}`)
        .then(response => {
          setPodjetje(prevPodjetje => {
            return {
              ...prevPodjetje,
              storitve: response.data
            }
          });
        })
        .then(() => {
          setPodjetje(prevPodjetje => {
            return {
              ...prevPodjetje,
              chosen: true
            }
          });
        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoading(false);
          navigate('/');
        }
        );
    }
    else {
      setIsLoading(false);
    }
  }, [podjetje_id, navigate, podjetje, setPodjetje]);

  if (isLoading) {
    return (
      <Loading />
    );
  }


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <div style={{
              backgroundImage: `url(${podjetje.podjetje_slika})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '150px',
              width: '100%',
              borderTopLeftRadius: '.25rem',
              borderTopRightRadius: '.25rem'
            }} />
            <Card.Body>
              <Card.Title className='mb-3'>{podjetje.podjetje_naziv}</Card.Title>
              {isLoading ? <Loading /> : <IzbiraStoritve podjetje={podjetje} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  );
}

export default Narocanje;