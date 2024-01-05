import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function NavBar(props) {

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
					<Link className="text-dark ms-4" to="/">{props.BusinessName}</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="ml-auto">

						{props.podjetje.chosen &&
							<>
								{renderLink(`/podjetje/${props.podjetje.podjetje_id}/narocanje`, 'Naročanje')}
								{renderLink(`/podjetje/${props.podjetje.podjetje_id}/zemljevid`, 'Zemljevid')}
								{renderLink(`/podjetje/${props.podjetje.podjetje_id}/kontakt`, 'Kontakt')}
							</>
						}
						{props.stranka.loggedIn ? (
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