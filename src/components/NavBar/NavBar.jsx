import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function NavBar(props) {
	return (

		<Nav className='bg-light mb-5' activeKey="/narocanje">
			<Nav.Link>
				<Link className="text-dark" to="/">{props.BusinessName}</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="text-dark" to="/narocanje">Naročanje</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="text-dark" eventKey="link-1">Zemljevid</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="text-dark" eventKey="link-2">Kontakt</Link>
			</Nav.Link>
		</Nav>

	);
}

export default NavBar;
