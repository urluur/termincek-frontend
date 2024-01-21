import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { StrankaContext } from "../../../contexts/contexts";

import Cookie from "universal-cookie";
import axios from 'axios';
import { API_URL } from '../../../utils/utils';
const cookie = new Cookie();

function Odjava() {
  const { setStranka } = useContext(StrankaContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL + '/auth/odjava', {},
      {
        withCredentials: true,
        timeout: 20000
      }
    )
      .then(response => {
        if (response.data.status.success === true) {
          cookie.remove('stranka_eposta');
          cookie.remove('stranka_geslo');

          setStranka({
            loggedIn: false,
            stranka_id: "",
            stranka_ime: "",
            stranka_priimek: "",
            stranka_eposta: ""
          });

          navigate('/prijava');
        }
      })
  }, [navigate, setStranka]);

  return (
    <></>
  )
}

export default Odjava