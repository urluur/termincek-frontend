import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

import { NarociloContext, StoritevContext } from "../../contexts/contexts";

function Potrdilo() {
  const { setNarocilo } = useContext(NarociloContext);
  const { setStoritev } = useContext(StoritevContext);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setStoritev({
      potrditev: false,
      storitev_id: "",
      storitev_ime: "",
      storitev_opis: "",
      storitev_slika: "",
      storitev_trajanje: "",
      storitev_cena: ""
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
    navigate('/profil');
  }

  return (
    <Container fluid className="d-flex flex-column">
      <Row className="mb-auto">
        <Col>
          <Card className="mb-3" style={{ 'width': '100%' }}>
            <Card.Body>
              <Card.Title>Naročilo potrjeno</Card.Title>
              <Card.Text>
                Vaše naročilo je bilo uspešno potrjeno.
              </Card.Text>
            </Card.Body>
          </Card>
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