import React from 'react'

function Profil(props) {
  return (
    <>
      <div>Pozdravljeni, {props.stranka.stranka_ime}!</div>
      <div>
        <div>Ime: {props.stranka.stranka_ime}</div>
        <div>Priimek: {props.stranka.stranka_priimek}</div>
        <div>E-pošta: {props.stranka.stranka_eposta}</div>
      </div>
    </>
  )
}

export default Profil