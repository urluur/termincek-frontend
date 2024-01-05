import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const Zemljevid = (props) => {
  const { podjetje_id } = useParams();

  if (!props.podjetje.chosen) {

    axios.get(`http://localhost:5050/podjetje/${podjetje_id}`)
      .then(response => {
        const tempPodjetje = response.data[0];
        props.setPodjetje({
          chosen: true,
          podjetje_id: tempPodjetje.podjetje_id,
          podjetje_naziv: tempPodjetje.podjetje_naziv,
          podjetje_naslov: tempPodjetje.podjetje_naslov,
          podjetje_slika: tempPodjetje.podjetje_slika
        }
        );
      })
  }


  return (
    <>
      <h1>Zemljevid</h1>
      <p>{props.podjetje.podjetje_naslov}</p>
    </>
  );
}

export default Zemljevid;