import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ServiceChooser from "./ServiceChooser/ServiceChooser";
import Map from "./NavBar/Map/Map";
import Contact from "./NavBar/Contact/Contact";
import Prijava from "./Prijava/Prijava";
import Registracija from "./Registracija/Registracija";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import NavBar from "./NavBar/NavBar";

const App = (props) => {
	let BusinessName = "Terminček";

	let sampleServices = [
		{
			name: "Striženje: kratki lasje",
			time: 30,
			price: 15
		},
		{
			name: "Striženje: dolgi lasje",
			time: 60,
			price: 30
		},
		{
			name: "Striženje: mašinca",
			time: 20,
			price: 10
		},
		{
			name: "Striženje: otroško",
			time: 30,
			price: 8
		},
		{
			name: "Barvanje: kratki lasje",
			time: 20,
			price: 20
		},
		{
			name: "Barvanje: dolgi lasje",
			time: 30,
			price: 30
		}
	];

	return (
		<>
			<NavBar BusinessName={BusinessName} />
			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/narocanje" element={<ServiceChooser services={sampleServices} />} />
					<Route path="/zemljevid" element={<Map />} />
					<Route path="/kontakt" element={<Contact />} />
					<Route path="/prijava" element={<Prijava />} />
					<Route path="/registracija" element={<Registracija />} />
					<Route path="*" element={<h1>404</h1>} />
				</Routes>
			</Container>
		</>
	);
};

export default App;
