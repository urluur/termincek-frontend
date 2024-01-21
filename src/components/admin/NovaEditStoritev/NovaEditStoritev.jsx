import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../../utils/utils';
import { PodjetjeContext } from '../../../contexts/contexts';

function NovaEditStoritev({ storitev, mode, handleClose }) {
  const { podjetje } = useContext(PodjetjeContext);
  const [formStoritev, setFormStoritev] = useState(storitev || {
    storitev_ime: '',
    storitev_opis: '',
    storitev_slika: '',
    storitev_cena: 0,
    storitev_trajanje: 0,
    podjetje_id: podjetje.podjetje_id
  });

  useEffect(() => {
    setFormStoritev(storitev);
  }, [storitev]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'storitev_cena' || name === 'storitev_trajanje') {
      finalValue = Number(value);
      if (isNaN(finalValue) || finalValue < 0) {
        finalValue = 0;
      }
    }

    setFormStoritev(prevState => ({
      ...prevState,
      [name]: finalValue
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (mode === 'edit') {
        response = await axios.post(API_URL + "/storitev/uredi/" + formStoritev.storitev_id, formStoritev, {
          withCredentials: true,
          timeout: 20000
        });
      } else {
        // set podjetje_id
        formStoritev.podjetje_id = podjetje.podjetje_id;
        response = await axios.post(API_URL + "/storitev/nova", formStoritev, {
          withCredentials: true,
          timeout: 20000
        });
      }
      console.log(response.data);
      handleClose(); // Close the modal
    } catch (error) {
      console.error('There was an error!', error);
    }
  }
  return (
    <Form onSubmit={handleSubmit} >
      <Form.Group controlId="formStoritevIme" className="mb-3">
        <Form.Label>Ime storitve</Form.Label>
        <Form.Control type="text" name="storitev_ime" value={formStoritev?.storitev_ime || ''} onChange={handleChange} required className="shadow-none" />
      </Form.Group>

      <Form.Group controlId="formStoritevOpis" className="mb-3">
        <Form.Label>Opis storitve</Form.Label>
        <Form.Control type="text" name="storitev_opis" value={formStoritev?.storitev_opis || ''} onChange={handleChange} required className="shadow-none" />
      </Form.Group>

      <Form.Group controlId="formStoritevSlika" className="mb-3">
        <Form.Label>Slika storitve</Form.Label>
        <Form.Control type="text" name="storitev_slika" value={formStoritev?.storitev_slika || ''} onChange={handleChange} required className="shadow-none" />
      </Form.Group>

      <Form.Group controlId="formStoritevCena" className="mb-3">
        <Form.Label>Cena storitve</Form.Label>
        <Form.Control type="number" name="storitev_cena" value={formStoritev?.storitev_cena} onChange={handleChange} required className="shadow-none" />
      </Form.Group>

      <Form.Group controlId="formStoritevTrajanje" className="mb-3">
        <Form.Label>Trajanje storitve</Form.Label>
        <Form.Control type="number" name="storitev_trajanje" value={formStoritev?.storitev_trajanje} onChange={handleChange} required className="shadow-none" />
      </Form.Group>

      <Button className='mt-3' variant="success" type="submit">
        Potrdi
      </Button>
    </Form>
  )
}

export default NovaEditStoritev