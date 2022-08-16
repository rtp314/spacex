import Nav from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Navbar() {
	return (
		<Nav variant='light' className='shadow-sm bg-white' sticky='top'>
			<Container>
				<Nav.Brand>SpaceX Launches</Nav.Brand>
			</Container>
		</Nav>
	);
}
