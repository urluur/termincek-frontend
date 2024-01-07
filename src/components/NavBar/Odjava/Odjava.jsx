import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";

import { StrankaContext } from "../../../contexts/contexts";

function Odjava() {

  const { setStranka } = useContext(StrankaContext);

  setStranka({
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