import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Button, Modal, Form, Alert, Tabs, Tab, Col, CloseButton } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../../../utils/utils'

const apiService = {
  fetchBreaks: async () => {
    const response = await axios.get(`${API_URL}/premori`, {
      withCredentials: true,
      timeout: 20000
    })
    return response.data
  },
  submitWorkHours: async (workHours) => {
    await axios.post(API_URL + '/urnik', {
      workHours: workHours,
    }, {
      withCredentials: true,
      timeout: 20000
    })
      .then(response => {
        alert("SUCCESS: " + JSON.stringify(response.data))
      })
      .catch(error => {
        alert("ERROR, MONA: " + JSON.stringify(error))
      })
  },
  addBreak: async (breakDate, breakDuration) => {
    await axios.post('/api/breaks', { date: breakDate, duration: breakDuration }, {
      withCredentials: true,
      timeout: 20000
    })
  },
  cancelBreak: async (id) => {
    await axios.delete(`/api/breaks/${id}`, {
      withCredentials: true,
      timeout: 20000
    })
  }
}

function Urnik() {

  const daysOfWeek = ['pon', 'tor', 'sre', 'cet', 'pet', 'sob', 'ned'];

  const [breaks, setBreaks] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [breakDate, setBreakDate] = useState('')
  const [breakDuration, setBreakDuration] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [workHours, setWorkHours] = useState({
    pon: [{ start: '', end: '' }],
    tor: [{ start: '', end: '' }],
    sre: [{ start: '', end: '' }],
    cet: [{ start: '', end: '' }],
    pet: [{ start: '', end: '' }],
    sob: [{ start: '', end: '' }],
    ned: [{ start: '', end: '' }]
  });

  useEffect(() => {
    // fetchBreaks()
  }, [])


  const fetchBreaks = async () => {
    try {
      const data = await apiService.fetchBreaks()
      setBreaks(data)
      setShowAlert(false)
    } catch (error) {
      setAlertMessage(`Error: ${error.message}`)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 5000)
    }
  }

  const addTimeRange = (day) => {
    setWorkHours({ ...workHours, [day]: [...workHours[day], { start: '', end: '' }] });
  }

  const updateTimeRange = (day, index, start, end) => {
    const newTimeRanges = [...workHours[day]];
    newTimeRanges[index] = { start, end };
    setWorkHours({ ...workHours, [day]: newTimeRanges });
  }

  const removeTimeRange = (day, index) => {
    const newTimeRanges = [...workHours[day]];
    newTimeRanges.splice(index, 1);
    setWorkHours({ ...workHours, [day]: newTimeRanges });
  }

  const submitWorkHours = async (event) => {
    event.preventDefault()
    alert(JSON.stringify(workHours))
    await apiService.submitWorkHours(workHours)
    // setWorkHours({
    //   pon: [{ start: '', end: '' }],
    //   tor: [{ start: '', end: '' }],
    //   sre: [{ start: '', end: '' }],
    //   cet: [{ start: '', end: '' }],
    //   pet: [{ start: '', end: '' }],
    //   sob: [{ start: '', end: '' }],
    //   ned: [{ start: '', end: '' }]
    // })
  }

  const addBreak = async (event) => {
    event.preventDefault()
    await apiService.addBreak(breakDate, breakDuration)
    setBreakDate('')
    setBreakDuration('')
    setShowModal(false)
    fetchBreaks()
  }

  const cancelBreak = async (id) => {
    await apiService.cancelBreak(id)
    fetchBreaks()
  }

  return (
    <Container>
      {showAlert && <Alert variant="danger">{alertMessage}</Alert>}
      <Row className="mb-3">
        <Card className="p-3 mb-3">
          <h1 className="mb-3">Urnik</h1>
          <Card.Text className="mb-3">Vaš fiksen tedenski urnik:</Card.Text>
          <Form onSubmit={submitWorkHours}>
            <Tabs className='nav-justified' defaultActiveKey="pon">

              {daysOfWeek.map((day, index) => (
                <Tab eventKey={day} title={day.charAt(0).toUpperCase() + day.slice(1)} key={index}>

                  {workHours[day].map((timeRange, index) => (
                    <Row className='mx-0 p-3 border border-top-0' key={index}>

                      <Col>
                        <Form.Label>Začetek:</Form.Label>
                        <Form.Control
                          type="time"
                          value={timeRange.start}
                          onChange={(e) => updateTimeRange(day, index, e.target.value, timeRange.end)}
                          required
                        />
                      </Col>
                      <Col>
                        <Form.Label>Konec:</Form.Label>
                        <Form.Control
                          type="time"
                          value={timeRange.end}
                          onChange={(e) => updateTimeRange(day, index, timeRange.start, e.target.value)}
                          required
                        />
                      </Col>
                      <Col xs={1} className='text-center'>
                        <CloseButton onClick={() => removeTimeRange(day, index)} />
                      </Col>


                    </Row>
                  ))}

                  <Button className='my-3' variant='success' onClick={() => addTimeRange(day)}>Dodaj časovni razpon</Button>
                </Tab>
              ))}

            </Tabs>
            <Button variant='success' type="submit">Potrdi in zaključi</Button>
          </Form>
        </Card>
      </Row>
      <Row className="mb-3">
        <Card className="p-3 mb-3">
          <h1 className="mb-3">Premori</h1>
          <Button variant='success' className="mb-3" onClick={() => setShowModal(true)}>Dodaj premor</Button>
          {breaks.map((breakItem) => (
            <p key={breakItem.id} className="mb-3">
              {breakItem.date} - {breakItem.duration}
              <Button variant='success' onClick={() => cancelBreak(breakItem.id)}>Prekliči</Button>
            </p>
          ))}
        </Card>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj premor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addBreak}>
            <Form.Group controlId="breakDate">
              <Form.Label>Datum in čas premora:</Form.Label>
              <Form.Control className='mb-3' type="datetime-local" value={breakDate} onChange={(e) => setBreakDate(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="breakDuration">
              <Form.Label>Dolžina premora:</Form.Label>
              <Form.Control as="select" className='mb-3' value={breakDuration} onChange={(e) => setBreakDuration(e.target.value)} required>
                <option value="">Izberi dolžino...</option>
                <option value="15min">15min</option>
                <option value="30min">30min</option>
                <option value="1h">1h</option>
                <option value="3h">3h</option>
                <option value="6h">6h</option>
                <option value="12h">12h</option>
                <option value="24h">24h</option>
              </Form.Control>
            </Form.Group>
            <Button variant='success' type="submit">Potrdi</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container >
  )
}

export default Urnik