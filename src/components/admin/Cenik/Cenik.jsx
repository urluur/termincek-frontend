import axios from 'axios'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { API_URL } from '../../../utils/utils'
import { PodjetjeContext } from '../../../contexts/contexts'
import { Button, Card, Container, Row, Col, Modal, Alert } from 'react-bootstrap'
import NovaEditStoritev from '../NovaEditStoritev/NovaEditStoritev'

function Cenik() {
  const { podjetje } = useContext(PodjetjeContext);
  const [storitve, setStoritve] = useState([]);
  const [selectedStoritev, setSelectedStoritev] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const fetchStoritve = useCallback(() => {
    axios.get(API_URL + "/api/storitve/" + podjetje.podjetje_id)
      .then(response => {
        setStoritve(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [podjetje.podjetje_id]);

  useEffect(() => {
    fetchStoritve();
  }, [fetchStoritve]);

  const handleDelete = (id) => {
    // delete storitev
    axios.delete(API_URL + "/api/storitev/" + id, {
      withCredentials: true,
      timeout: 20000
    })
      .then(response => {
        setStoritve(storitve.filter(storitev => storitev.storitev_id !== id));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  const handleEdit = (storitev) => {
    setSelectedStoritev({ ...storitev });
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    fetchStoritve();
  }

  return (
    <Container>
      <Row className="align-items-center mb-3">
        <Col>
          <h1>Cenik</h1>
        </Col>
        <Col xs="auto">
          <Button variant="success" size="lg" onClick={() => handleEdit({})}>Nova storitev</Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStoritev && selectedStoritev.storitev_id ? 'Uredi storitev' : 'Nova storitev'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStoritev && <NovaEditStoritev storitev={selectedStoritev} mode={selectedStoritev.storitev_id ? 'edit' : 'create'} handleClose={handleClose} />}
        </Modal.Body>
      </Modal>
      <Row>
        {storitve.length > 0 ? (
          storitve.map(storitev => (
            <Col md={6} lg={4} className="mb-3">
              <Card key={storitev.storitev_id}>
                <Row className="no-gutters">
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{storitev.storitev_ime}</Card.Title>
                      <Card.Text>Opis: {storitev.storitev_opis}</Card.Text>
                      <Card.Text>Cena: {storitev.storitev_cena}€</Card.Text>
                      <Card.Text>Čas trajanja: {storitev.storitev_trajanje} min</Card.Text>
                      <Button className='m-1' variant="success" onClick={() => handleEdit(storitev)}>Uredi</Button>
                      <Button className='m-1' variant="danger" onClick={() => handleDelete(storitev.storitev_id)}>Izbriši</Button>
                    </Card.Body>
                  </Col>
                  <Col md={4}>
                    <Card.Img src={storitev.storitev_slika} className="img-fluid" />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="d-flex justify-content-center">
            <Alert variant="success" className='p-4 d-inline-flex align-items-center flex-column'>
              <div>
                <Alert.Heading>Vaše podjetje trenutno ne nudi storitev.</Alert.Heading>
                <p>Dodajte storitev z gumbom Nova storitev.</p>
              </div>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default Cenik