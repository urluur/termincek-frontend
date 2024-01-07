import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import IzbiraStoritve from './IzbiraStoritve';
import Loading from '../Loading/Loading';
import IzbiraCasa from './IzbiraCasa';
import Pregled from './Pregled';
import Potrdilo from './Potrdilo';

import { StrankaContext, PodjetjeContext, NarociloContext, StoritevContext, DelavciContext } from "../../contexts/contexts";

function Narocanje(props) {

  const { stranka } = useContext(StrankaContext);
  const { podjetje, setPodjetje } = useContext(PodjetjeContext);
  const { narocilo, setNarocilo } = useContext(NarociloContext);
  const { storitev, setStoritev } = useContext(StoritevContext);
  const { delavci, setDelavci } = useContext(DelavciContext);

  const { podjetje_id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (stranka.loggedIn) {
      setNarocilo(prevNarocilo => ({ ...prevNarocilo, stranka_id: stranka.stranka_id }));
    }
    // TODO: do something if logged out

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
  }, [podjetje_id, navigate, podjetje, setPodjetje, stranka, setNarocilo]);

  useEffect(() => {
    axios.get(`http://localhost:5050/delavci/${podjetje_id}`)
      .then(response => {
        setDelavci(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [setDelavci, podjetje_id]);

  if (isLoading) {
    return (
      <Loading />
    );
  }


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={10} lg={6}>
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
              {
                isLoading ?
                  <Loading />
                  :
                  <>
                    {
                      !storitev.potrditev && !narocilo.cas_potrditev && !narocilo.potrditev ?
                        <IzbiraStoritve podjetje={podjetje} setNarocilo={setNarocilo} storitev={storitev} setStoritev={setStoritev} />
                        :
                        <>
                          {
                            !narocilo.cas_potrditev && !narocilo.potrditev ?
                              <IzbiraCasa setStoritev={setStoritev} setNarocilo={setNarocilo} delavci={delavci} />
                              :
                              <>
                                {
                                  !narocilo.potrditev ?
                                    <Pregled narocilo={narocilo} potrditev setNarocilo={setNarocilo} />
                                    :
                                    <Potrdilo setNarocilo={setNarocilo} />
                                }
                              </>
                          }
                        </>
                    }
                  </>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  );
}

export default Narocanje;