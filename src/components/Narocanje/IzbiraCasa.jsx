import React, { useContext, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap';

import { DelavciContext } from "../../contexts/contexts";

const IzbiraCasa = (props) => {

  const { delavci } = useContext(DelavciContext);

  // TODO: termin more actually bit fraj itd...

  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedDelavec, setSelectedDelavec] = useState(null);

  const handleBackClick = () => {
    props.setNarocilo(prevNarocilo => {
      return {
        ...prevNarocilo,
        storitev_id: "",
        cas_potrditev: false
      }
    });
    props.setStoritev(prevStoritev => {
      return {
        ...prevStoritev,
        potrditev: false
      }
    });
  }

  const handleDateTimeChange = (event) => {
    const selectedDateTime = event.target.value;
    setSelectedDateTime(new Date(selectedDateTime));
    props.setNarocilo(prevNarocilo => {
      return {
        ...prevNarocilo,
        narocilo_cas: selectedDateTime,
      }
    });
  };

  const handleNextClick = () => {
    props.setNarocilo(prevNarocilo => {
      return {
        ...prevNarocilo,
        cas_potrditev: true
      }
    });
  };

  const isDateTimeInPast = () => {
    const now = new Date();
    return selectedDateTime && selectedDateTime < now;
  };

  const handleDelavecChange = (event) => {
    const selectedDelavecId = Number(event.target.value);

    setSelectedDelavec(selectedDelavecId);
    props.setNarocilo(prevNarocilo => {
      return {
        ...prevNarocilo,
        delavec_id: selectedDelavecId,
      }
    });
  };

  return (
    <Container className='mt-2'>
      <Row>
        <h2 className="mb-2">Izberite termin</h2>
        <Col>
          <Form>
            <Form.Group controlId="formDateTime">
              <Form.Control type="datetime-local" onChange={handleDateTimeChange} className="mb-3" />
            </Form.Group>
            <Form.Group controlId="formDelavec" className='mb-3'>
              <Form.Label>Izberite delavca</Form.Label>
              <Form.Control as="select" onChange={handleDelavecChange}>
                <option value="">-- Izberite delavca --</option>
                {
                  delavci.map((delavec, index) => {
                    return (
                      <option key={index} value={delavec.delavec_id}>{delavec.delavec_ime} {delavec.delavec_priimek}</option>
                    );
                  })
                }
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleBackClick}>Spremeni storitev</Button>
        <Button variant="primary" onClick={handleNextClick} disabled={!selectedDateTime || isDateTimeInPast() || !selectedDelavec}>Pregled naročila</Button>
      </div>
    </Container>
  );
}

export default IzbiraCasa