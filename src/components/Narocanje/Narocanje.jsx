import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import IzbiraStoritve from './IzbiraStoritve';
import Loading from '../Loading/Loading';
import IzbiraCasa from './IzbiraCasa';
import Pregled from './Pregled';
import Potrdilo from './Potrdilo';

import { StrankaContext, PodjetjeContext, NarociloContext, StoritevContext, ZaposleniContext } from "../../contexts/contexts";
import { API_URL } from '../../utils/utils';

function Narocanje(props) {

  const { stranka } = useContext(StrankaContext);
  const { podjetje, setPodjetje } = useContext(PodjetjeContext);
  const { narocilo, setNarocilo } = useContext(NarociloContext);
  const { storitev } = useContext(StoritevContext);
  const { setZaposleni } = useContext(ZaposleniContext);

  const { podjetje_id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (stranka.loggedIn) {
      setNarocilo(prevNarocilo => ({ ...prevNarocilo, stranka_id: stranka.stranka_id }));
    }

    if (!podjetje.chosen) {
      axios.get(API_URL + `/api/podjetja/${podjetje_id}`)
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

      axios.get(API_URL + `/api/storitve/${podjetje_id}`)
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
    axios.get(API_URL + `/api/delavci/${podjetje_id}`)
      .then(response => {
        setZaposleni(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [setZaposleni, podjetje_id]);

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
                        <IzbiraStoritve />
                        :
                        <>
                          {
                            !narocilo.cas_potrditev && !narocilo.potrditev ?
                              <IzbiraCasa />
                              :
                              <>
                                {
                                  !narocilo.potrditev ?
                                    <Pregled />
                                    :
                                    <Potrdilo />
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