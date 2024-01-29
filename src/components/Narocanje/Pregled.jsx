import React, { useContext } from 'react'
import { Button, Card, ListGroup, Form, Container } from 'react-bootstrap';
import axios from 'axios';

import { NarociloContext, StoritevContext, ZaposleniContext } from "../../contexts/contexts";
import { API_URL } from '../../utils/utils';

function Pregled() {
  const { narocilo, setNarocilo } = useContext(NarociloContext);
  const { storitev } = useContext(StoritevContext);
  const { zaposleni } = useContext(ZaposleniContext);

  const handleBackClick = () => {
    setNarocilo(prevNarocilo => ({
      ...prevNarocilo,
      cas_potrditev: false,
      narocilo_opombe: ""
    }));
  };

  const handleOpombeChange = (event) => {
    const opombe = event.target.value;
    setNarocilo(prevNarocilo => ({ ...prevNarocilo, narocilo_opombe: opombe }));
  };

  const handleSubmitClick = () => {
    if (!window.confirm("Ste prepričani, da želite poslati naročilo?")) {
      return;
    }
    const minNarocilo = {
      narocilo_cas: narocilo.narocilo_cas,
      narocilo_opombe: narocilo.narocilo_opombe,
      stranka_id: narocilo.stranka_id,
      delavec_id: narocilo.delavec_id,
      storitev_id: narocilo.storitev_id
    };
    axios.post(API_URL + '/api/narocilo/novo', minNarocilo,
      {
        withCredentials: true,
        timeout: 20000
      }
    )
      .then(response => {
        setNarocilo(prevNarocilo => ({ ...prevNarocilo, potrditev: true }));
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Naročilo ni bilo uspešno poslano.")
      });
  };

  const matchingDelavec = zaposleni.find(delavec => delavec.delavec_id === narocilo.delavec_id);

  return (
    <Container>
      <Card className='mb-3' style={{ 'width': '100%' }}>
        <Card.Body>
          <Card.Title>{storitev.storitev_ime}</Card.Title>
          <Card.Subtitle className="mb-1 text-muted">

            {/* display name and surname here */}
            {matchingDelavec && `${matchingDelavec.delavec_ime} ${matchingDelavec.delavec_priimek}`}


          </Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item className='px-0'>Opis: {storitev.storitev_opis}</ListGroup.Item>
            <ListGroup.Item className='px-0'>Datum: {new Date(narocilo.narocilo_cas).toLocaleString('sl-SI').split(',')[0]}</ListGroup.Item>
            <ListGroup.Item className='px-0'>Ura: {new Date(narocilo.narocilo_cas).toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
          </ListGroup>
          <Form.Group controlId="formOpombe" className='mt-1'>
            <Form.Control
              type="text"
              placeholder="Vnesite opombe"
              value={narocilo.narocilo_opombe}
              onChange={handleOpombeChange}
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleBackClick}>Spremeni čas</Button>
        <div className="ml-auto">
          <Button
            variant="success"
            onClick={handleSubmitClick}
            disabled={!narocilo.narocilo_cas || !narocilo.stranka_id || !narocilo.delavec_id || !narocilo.storitev_id}
          >
            Potrdi naročilo
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Pregled