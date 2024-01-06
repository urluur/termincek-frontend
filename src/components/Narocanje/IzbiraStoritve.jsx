import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

const IzbiraStoritve = (props) => {
  const { podjetje, setNarocilo, storitev, setStoritev } = props;
  const [searchValue, setSearchValue] = useState('')
  const [iskaneStoritve, setIskaneStoritve] = useState([])

  const [selectedRow, setSelectedRow] = useState(null)

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleRowClick = (storitev) => {
    if (storitev.storitev_id === selectedRow) {
      setSelectedRow('');
      setStoritev({
        potrditev: false,
        storitev_id: "",
        storitev_ime: "",
        storitev_opis: "",
        storitev_slika: "",
        storitev_trajanje: "",
        storitev_cena: ""
      }
      );
    } else {
      setSelectedRow(storitev.storitev_id);
      setStoritev(storitev);
    }
  }

  function handleNextClick() {
    setNarocilo(prevNarocilo => {
      return {
        ...prevNarocilo,
        storitev_id: storitev.storitev_id
      }
    }
    )
    setStoritev(prevStoritev => {
      return {
        ...prevStoritev,
        potrditev: true,
        storitev_id: storitev.storitev_id,
        storitev_ime: storitev.storitev_ime,
        storitev_opis: storitev.storitev_opis,
        storitev_slika: storitev.storitev_slika,
        storitev_trajanje: storitev.storitev_trajanje,
        storitev_cena: storitev.storitev_cena
      }
    })
  }

  useEffect(() => {
    if (podjetje.storitve) {
      const filteredStoritve = podjetje.storitve.filter(storitev => {
        return storitev.storitev_ime.toLowerCase().includes(searchValue.toLowerCase());
      });
      setIskaneStoritve(filteredStoritve);
    }
  }, [podjetje, searchValue]);

  useEffect(() => {
    if (storitev.storitev_id) {
      setSelectedRow(storitev.storitev_id);
    }
  }, [storitev.storitev_id]);

  return (
    <div>
      <Container fluid className='mt-1'>
        <Row>
          <Col>
            <h2>Izberite storitev</h2>
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
                    <tr key={i} onClick={() => handleRowClick(storitev)}>
                      <td>{storitev.storitev_ime} {storitev.storitev_id === selectedRow && '✅'}</td>
                      <td>{storitev.storitev_trajanje} min</td>
                      <td>{storitev.storitev_cena}€</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleNextClick} disabled={!storitev.storitev_id}>Določi čas</Button>
        </div>
      </Container>
    </div>
  )
}

export default IzbiraStoritve