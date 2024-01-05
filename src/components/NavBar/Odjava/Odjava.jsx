import React from 'react'
import { useNavigate } from "react-router-dom";

function Odjava(props) {

  props.setStranka({
    loggedIn: false,
    stranka_id: "",
    stranka_ime: "",
    stranka_priimek: "",
    stranka_eposta: ""
  });

  const navigate = useNavigate();
  navigate('/prijava');

  return (
    <></>
  )
}

export default Odjava