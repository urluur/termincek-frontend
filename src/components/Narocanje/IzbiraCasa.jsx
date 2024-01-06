import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';

const IzbiraCasa = (props) => {
  const handleBackClick = () => {
    props.setNarocilo(prevNarocilo => {
      return {
        ...prevNarocilo,
        storitev_id: "",
        potrditev_cas: false
      }
    });
    props.setStoritev(prevStoritev => {
      return {
        ...prevStoritev,
        potrditev: false
      }
    });
  }

  return (
    <Container fluid className='mt-1'>
      <Row>
        <Col>
          <h2>Izberite termin</h2>
        </Col>
        <Col>
        </Col>
      </Row>
      <Row>
        <div className="d-flex justify-content-start">
          <Button variant="secondary" onClick={handleBackClick}>Spremeni storitev</Button>
        </div>
      </Row>
    </Container>
  )
}

export default IzbiraCasa