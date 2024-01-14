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
import { StrankaContext, PodjetjeContext, NarociloContext, StoritevContext, ZaposleniContext, DelavecContext } from "../contexts/contexts";
import NovoPodjetje from "./admin/NovoPodjetje/NovoPodjetje";
import PrijavaDelavec from "./admin/PrijavaDelavec/PrijavaDelavec";
import Narocila from "./admin/Narocila/Narocila";
import OdjavaDelavec from "./admin/OdjavaDelavec/OdjavaDelavec";
import Urnik from "./admin/Urnik/Urnik";
import Cenik from "./admin/Cenik/Cenik";
import PrijavaPodjetje from "./admin/PrijavaPodjetje/PrijavaPodjetje";
import Delavci from "./admin/Delavci/Delavci";
import RegistracijaDelavec from "./admin/RegistracijaDelavec/RegistracijaDelavec";

const App = (props) => {

	const [delavec, setDelavec] = useState({
		loggedIn: false,
		isAdmin: false,
		delavec_id: "",
		delavec_ime: "",
		delavec_priimek: "",
		delavec_slika: "",
		delavec_eposta: "",
		delavec_telefon: ""
	});

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

	const [zaposleni, setZaposleni] = useState([
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

			<DelavecContext.Provider value={{ delavec: delavec, setDelavec: setDelavec }}>
				<StrankaContext.Provider value={{ stranka, setStranka }}>
					<PodjetjeContext.Provider value={{ podjetje, setPodjetje }}>
						<NarociloContext.Provider value={{ narocilo, setNarocilo }}>
							<StoritevContext.Provider value={{ storitev, setStoritev }}>
								<ZaposleniContext.Provider value={{ zaposleni, setZaposleni }}>

									<NavBar />

									<Container className="mt-3 mb-3">
										<Routes>

											<Route path="/" element={<Home />} />

											{/* delavec routes */}
											<Route path="/narocila" element={<Narocila />} />
											<Route path="/urnik" element={<Urnik />} />

											{/* admin routes */}
											<Route path="/cenik" element={<Cenik />} />
											<Route path="/delavci" element={<Delavci />} />
											<Route path="/registracija/delavec" element={<RegistracijaDelavec />} />

											<Route path="/podjetje/:podjetje_id/narocanje" element={<Narocanje />} />
											<Route path="/podjetje/:podjetje_id/zemljevid" element={<Zemljevid />} />
											<Route path="/podjetje/:podjetje_id/kontakt" element={<Kontakt />} />

											<Route path="/prijava" element={<Prijava />} />
											<Route path="/prijava/delavec" element={<PrijavaDelavec />} />
											<Route path="/prijava/podjetje" element={<PrijavaPodjetje />} />
											<Route path="/registracija" element={<Registracija />} />
											<Route path="/registracija/podjetje" element={<NovoPodjetje />} />

											<Route path='/profil' element={<Profil />} />
											<Route path='/odjava' element={<Odjava />} />
											<Route path='/odjava-delavec' element={<OdjavaDelavec />} />

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
												Zaposleni: {JSON.stringify(zaposleni)}
												<p />
												Delavec: {JSON.stringify(delavec)}
											</>
										}
									</Container >

								</ZaposleniContext.Provider>
							</StoritevContext.Provider>
						</NarociloContext.Provider>
					</PodjetjeContext.Provider>
				</StrankaContext.Provider>
			</DelavecContext.Provider>
		</>
	);
};

export default App;
