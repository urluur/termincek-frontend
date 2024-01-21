import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading/Loading';
import { PodjetjeContext, NarociloContext, StoritevContext, ZaposleniContext, StrankaContext, DelavecContext } from "../contexts/contexts";
import { API_URL } from '../utils/utils';
function Home() {

  const { stranka } = useContext(StrankaContext)
  const { delavec } = useContext(DelavecContext)
  const { setPodjetje } = useContext(PodjetjeContext);
  const { setNarocilo } = useContext(NarociloContext);
  const { setStoritev } = useContext(StoritevContext);
  const { setZaposleni } = useContext(ZaposleniContext);

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

  useEffect(() => {
    const reset = () => {
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

      setZaposleni([
        {
          delavec_id: "",
          delavec_ime: "",
          delavec_priimek: "",
          delavec_slika: "",
          delavec_eposta: "",
          delavec_telefon: ""
        }
      ]);
    }
    if (!delavec.loggedIn) {
      reset();
    }
  }, [setZaposleni, setNarocilo, setPodjetje, setStoritev, delavec.loggedIn]);

  if (isLoading) {
    return (
      <Loading />);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">
                Izberite <b>Terminček</b>
              </Card.Title>
              {
                !stranka.loggedIn && !delavec.loggedIn &&
                <>
                  <Card.Text>
                    Ste lastnik podjetja?
                  </Card.Text>
                  <ListGroup variant="horizontal">
                    <ListGroup.Item>
                      <Link to="/prijava/delavec">
                        Prijava za delavce
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="/registracija/podjetje">
                        Registrirajte novo podjetje
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </>
              }

              {delavec.loggedIn ?
                <>
                  <Card.Text className='mt-4'>
                    Pozdravljeni, {delavec.delavec_ime}!
                  </Card.Text>
                </>
                :
                <>
                  <Card.Text className='mt-4'>
                    Podjetja:
                  </Card.Text>
                  <ListGroup>
                    {podjetja.map(podjetje => (
                      <ListGroup.Item key={podjetje.podjetje_id}>
                        <Link to={`/podjetje/${podjetje.podjetje_id}/narocanje`}> {podjetje.podjetje_naziv} </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default Home;