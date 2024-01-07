import React from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

function Pregled({ narocilo, setNarocilo }) {

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
    setNarocilo(prevNarocilo => ({ ...prevNarocilo, potrditev: true }));
    const minNarocilo = {
      narocilo_cas: narocilo.narocilo_cas,
      narocilo_opombe: narocilo.narocilo_opombe,
      stranka_id: narocilo.stranka_id,
      delavec_id: narocilo.delavec_id,
      storitev_id: narocilo.storitev_id
    };
    axios.post('http://localhost:5050/narocilo/novo', minNarocilo)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Card className='mb-3'>
        <Card.Body>
          <pre>{JSON.stringify(narocilo, null, 2)}</pre>
          <Form.Group controlId="formOpombe">
            <Form.Label>Opombe</Form.Label>
            <Form.Control type="text" placeholder="Vnesite opombe" onChange={handleOpombeChange} />
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleBackClick}>Spremeni čas</Button>
        <div className="ml-auto">
          <Button
            variant="primary"
            onClick={handleSubmitClick}
            disabled={!narocilo.narocilo_cas || !narocilo.stranka_id || !narocilo.delavec_id || !narocilo.storitev_id}
          >
            Potrdi naročilo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pregled