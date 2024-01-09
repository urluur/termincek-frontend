import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Cookie from "universal-cookie";
import { StrankaContext, PodjetjeContext, NarociloContext, StoritevContext, DelavciContext } from "../contexts/contexts";

const cookie = new Cookie();

const App = (props) => {
	let BusinessName = "Terminček";
	const navigate = useNavigate();

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

	if (cookie.get('stranka_eposta') && cookie.get('stranka_geslo') && !stranka.loggedIn) {
		navigate('/prijava');
	}

	return (
		<>
			<StrankaContext.Provider value={{ stranka, setStranka }}>
				<PodjetjeContext.Provider value={{ podjetje, setPodjetje }}>
					<NarociloContext.Provider value={{ narocilo, setNarocilo }}>
						<StoritevContext.Provider value={{ storitev, setStoritev }}>
							<DelavciContext.Provider value={{ delavci, setDelavci }}>

								<NavBar BusinessName={BusinessName} stranka={stranka} podjetje={podjetje} />

								<Container>
									<Routes>

										<Route path="/" element={<Home />} />

										<Route path="/podjetje/:podjetje_id/narocanje" element={<Narocanje />} />
										<Route path="/podjetje/:podjetje_id/zemljevid" element={<Zemljevid />} />
										<Route path="/podjetje/:podjetje_id/kontakt" element={<Kontakt />} />

										<Route path="/prijava" element={<Prijava />} />
										<Route path="/registracija" element={<Registracija />} />

										<Route path='/profil' element={<Profil />} />
										<Route path='/odjava' element={<Odjava />} />

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

							</DelavciContext.Provider>
						</StoritevContext.Provider>
					</NarociloContext.Provider>
				</PodjetjeContext.Provider>
			</StrankaContext.Provider>
		</>
	);
};

export default App;
