import React from "react";
import Nav from 'react-bootstrap/Nav';

function NavBar(props) {
	return (

		<Nav className='bg-light mb-5' activeKey="/narocanje">
			<Nav.Item>
				<Nav.Link className="text-dark" href="/">{props.BusinessName}</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link className="text-dark" href="/narocanje">Naročanje</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link className="text-dark" eventKey="link-1">Zemljevid</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link className="text-dark" eventKey="link-2">Kontakt</Nav.Link>
			</Nav.Item>
		</Nav>

	);
}

export default NavBar;
