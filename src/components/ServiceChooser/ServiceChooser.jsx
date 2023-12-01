import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ServiceChooser = (props) => {

  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredServices = props.services.filter(service => {
    return service.name.toLowerCase().includes(searchValue.toLowerCase());
  })

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h2>Storitve</h2>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder={props.placeholder || "Search"}
              value={searchValue}
              onChange={handleSearch}
              className='px-3 mb-2 bg-light text-dark rounded-pill w-50 float-end'
            />
          </Col>
        </Row>

        <Row>
          <Table striped responsive hover bordered
            className='rounded-pill'
          >
            <thead>
              <tr>
                <th>Ime</th>
                <th>Čas</th>
                <th>Cena</th>
              </tr>
            </thead>
            <tbody>

              {
                filteredServices.map((service, i) => {
                  return (
                    <tr key={i}>
                      <td>{service.name}</td>
                      <td>{service.time} min</td>
                      <td>{service.price}€</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  )
}

export default ServiceChooser