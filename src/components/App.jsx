import React from "react";
import NavBar from "./NavBar/NavBar";
import ServiceChooser from "./ServiceChooser/ServiceChooser";

const App = (props) => {
	let BusinessName = "Termincek";

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
		<div>
			<NavBar BusinessName={BusinessName} />

			<ServiceChooser services={sampleServices} />

		</div>
	);
};

export default App;
