import { useContext } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { StrankaContext, PodjetjeContext } from "../../contexts/contexts";

function NavBar() {

	const { stranka } = useContext(StrankaContext);
	const { podjetje } = useContext(PodjetjeContext);

	const location = useLocation();

	const renderLink = (path, label) => {
		return location.pathname === path ? (
			<Nav.Link disabled>{label}</Nav.Link>
		) : (
			<Nav.Link><Link className="text-dark" to={path}>{label}</Link></Nav.Link>
		);
	};

	return (
		<Navbar bg="light" variant="light" expand="md" className="mb-3">
			<Container>
				<Navbar.Brand>
					<Image
						src="/favicon.ico"
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt="favicon"
					/>
					<Link className="text-dark ms-4" to="/">Terminček</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="ml-auto">

						{podjetje.chosen &&
							<>
								{renderLink(`/podjetje/${podjetje.podjetje_id}/narocanje`, 'Naročanje')}
								{renderLink(`/podjetje/${podjetje.podjetje_id}/zemljevid`, 'Zemljevid')}
								{renderLink(`/podjetje/${podjetje.podjetje_id}/kontakt`, 'Kontakt')}
							</>
						}
						{stranka.loggedIn ? (
							<>
								{renderLink('/profil', 'Profil')}
								{renderLink('/odjava', 'Odjava')}
							</>
						) : (
							<>
								{renderLink('/prijava', 'Prijava')}
								{renderLink('/registracija', 'Registracija')}
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	);
}

export default NavBar;