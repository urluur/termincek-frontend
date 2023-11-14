import React from "react";

function NavBar(props) {
	return (
		<nav>
			<ul className="text-xs px-5 py-1 flex justify-between">
				<li>{props.BusinessName}</li>
				<li>Naročanje</li>
				<li>Zemljevid</li>
				<li>Kontakt</li>
			</ul>
		</nav>
	);
}

export default NavBar;
