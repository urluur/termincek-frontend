import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const IzbiraStoritve = (props) => {
  const { podjetje } = props;
  const [searchValue, setSearchValue] = useState('')
  const [iskaneStoritve, setIskaneStoritve] = useState([])

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (podjetje.storitve) {
      const filteredStoritve = podjetje.storitve.filter(storitev => {
        return storitev.storitev_ime.toLowerCase().includes(searchValue.toLowerCase());
      });
      setIskaneStoritve(filteredStoritve);
    }
  }, [podjetje, searchValue]);

  return (
    <div>
      <Container fluid className='mt-1'>
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
                iskaneStoritve.map((storitev, i) => {
                  return (
                    <tr key={i}>
                      <td>{storitev.storitev_ime}</td>
                      <td>{storitev.storitev_trajanje} min</td>
                      <td>{storitev.storitev_cena}€</td>
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

export default IzbiraStoritve