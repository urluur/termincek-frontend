import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap';

function Potrdilo(props) {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // TODO: reset narocilo
    props.setNarocilo({
      potrditev: false,
      cas_potrditev: false,
      narocilo_cas: "",
      narocilo_opombe: "",
      storitev_id: "",
      stranka_id: "",
      delavec_id: ""
    });
    navigate('/profil');
  }

  return (
    <Container fluid className="d-flex flex-column">
      <Row className="mb-auto">
        <Col>
          <div>Potrdilo</div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button onClick={handleButtonClick}>Ogled terminov</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Potrdilo