import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar(props) {
	return (
		<Navbar bg="light" variant="light" expand="lg" className="mb-5">
			<Container>
				<Navbar.Brand>
					<Image
						src="/favicon.ico"
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt="favicon"
					/>
					<Link className="text-dark ms-4" to="/">{props.BusinessName}</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="ml-auto">
						<Nav.Link><Link className="text-dark" to="/narocanje">Naročanje</Link></Nav.Link>
						<Nav.Link><Link className="text-dark" to="/zemljevid">Zemljevid</Link></Nav.Link>
						<Nav.Link><Link className="text-dark" to="/kontakt">Kontakt</Link></Nav.Link>
						<Nav.Link><Link className="text-dark" to="/prijava">Prijava</Link></Nav.Link>
						<Nav.Link><Link className="text-dark" to="/registracija">Registracija</Link></Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;