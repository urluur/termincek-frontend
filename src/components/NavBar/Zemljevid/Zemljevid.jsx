import React, { useContext } from "react";
import { PodjetjeContext } from "../../../contexts/contexts";

const Zemljevid = () => {

  const { podjetje } = useContext(PodjetjeContext);

  return (
    <>
      <h1>Zemljevid</h1>
      <p>{podjetje.podjetje_naslov}</p>
    </>
  );
}

export default Zemljevid;