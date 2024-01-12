import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../../contexts/contexts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../utils/utils';
import Cookie from "universal-cookie";
const cookie = new Cookie();

function OdjavaDelavec() {
  const { setAdmin } = useContext(AdminContext);
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
          cookie.remove('delavec_eposta');
          cookie.remove('delavec_geslo');

          setAdmin({
            loggedIn: false,
            delavec_id: "",
            delavec_ime: "",
            delavec_priimek: "",
            delavec_eposta: ""
          });

          navigate('/');
        }
      })
  }, [navigate, setAdmin]);

  return (
    <></>
  )
}

export default OdjavaDelavec