import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import NavBar from "./NavBar/NavBar";
import Zemljevid from "./NavBar/Zemljevid/Zemljevid";
import Kontakt from "./NavBar/Kontakt/Kontakt";
import Prijava from "./Prijava/Prijava";
import Registracija from "./Registracija/Registracija";
import Narocanje from './Narocanje/Narocanje';
import Profil from './NavBar/Profil/Profil';
import Odjava from "./NavBar/Odjava/Odjava";

const App = (props) => {
	let BusinessName = "Terminček";

	const [stranka, setStranka] = useState({
		loggedIn: false,
		stranka_id: "",
		stranka_ime: "",
		stranka_priimek: "",
		stranka_eposta: ""
	});

	const [podjetje, setPodjetje] = useState({
		chosen: false,
		podjetje_id: "",
		podjetje_naziv: "",
		podjetje_naslov: "",
		podjetje_slika: "",
		storitve: []
	});

	const [narocilo, setNarocilo] = useState({
		potrditev: false,
		cas_potrditev: false,
		narocilo_cas: "",
		narocilo_opombe: "",
		storitev_id: "",
		stranka_id: "",
		delavec_id: ""
	});

	const [storitev, setStoritev] = useState({
		potrditev: false,
		storitev_id: "",
		storitev_ime: "",
		storitev_opis: "",
		storitev_slika: "",
		storitev_trajanje: "",
		storitev_cena: ""
	});

	const [delavci, setDelavci] = useState([
		{
			delavec_id: "",
			delavec_ime: "",
			delavec_priimek: "",
			delavec_slika: "",
			delavec_eposta: "",
			delavec_telefon: ""
		}
	]);

	return (
		<>
			<NavBar BusinessName={BusinessName} stranka={stranka} podjetje={podjetje} />

			<Container>
				<Routes>

					<Route path="/" element={<Home setPodjetje={setPodjetje} setNarocilo={setNarocilo} setStoritev={setStoritev} setDelavci={setDelavci} />} />

					<Route path="/podjetje/:podjetje_id/narocanje" element={<Narocanje podjetje={podjetje} setPodjetje={setPodjetje} narocilo={narocilo} setNarocilo={setNarocilo} storitev={storitev} setStoritev={setStoritev} stranka={stranka} setStranka={setStranka} delavci={delavci} setDelavci={setDelavci} />} />
					<Route path="/podjetje/:podjetje_id/zemljevid" element={<Zemljevid podjetje={podjetje} setPodjetje={setPodjetje} />} />
					<Route path="/podjetje/:podjetje_id/kontakt" element={<Kontakt delavci={delavci} setDelavci={setDelavci} />} />

					<Route path="/prijava" element={<Prijava setStranka={setStranka} />} />
					<Route path="/registracija" element={<Registracija setStranka={setStranka} />} />

					<Route path='/profil' element={<Profil stranka={stranka} />} />
					<Route path='/odjava' element={<Odjava setStranka={setStranka} />} />

					<Route path="*" element={<h1>404</h1>} />

				</Routes>
				{
					! // comment this line to show debug info
					true &&
					<>
						Debug:
						<p />
						Storitev: {JSON.stringify(storitev)}
						<p />
						Podjetje: {JSON.stringify(podjetje)}
						<p />
						Stranka {JSON.stringify(stranka)}
						<p />
						Narocilo: {JSON.stringify(narocilo)}
						<p />
						Delavci: {JSON.stringify(delavci)}
					</>
				}
			</Container>

		</>
	);
};

export default App;
