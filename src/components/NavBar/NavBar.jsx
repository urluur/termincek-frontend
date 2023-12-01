import React from "react";

function NavBar(props) {
	return (
		<nav>
			<ul>
				<li>{props.BusinessName}</li>
				<li>Naročanje</li>
				<li>Zemljevid</li>
				<li>Kontakt</li>
			</ul>
		</nav>
	);
}

export default NavBar;
