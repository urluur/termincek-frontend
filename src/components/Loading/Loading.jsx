import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import './Loading.css';

function Loading() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Spinner animation="border" role="status" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <span className="loading">Loading<span className="dots"><span>.</span><span>.</span><span>.</span></span></span>
        </Col>
      </Row>
    </Container>
  )
}

export default Loading