import NavbarBS from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import RocketLogo from "./RocketLogo";
import styled from "styled-components";
import React, { useState } from "react";

const StyledContainer = styled(Container)`
	svg {
		height: 1.5em;
		margin-left: 0.5em;
	}
`;

export default function Navbar() {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			<NavbarBS variant='light' className='shadow-sm bg-white' sticky='top'>
				<StyledContainer>
					<NavbarBS.Brand>
						SpaceX Launches
						<RocketLogo />
					</NavbarBS.Brand>
					<Nav>
						<Nav.Item onClick={() => setShowModal((prev) => !prev)}>What is this?</Nav.Item>
					</Nav>
				</StyledContainer>
			</NavbarBS>
			<AboutModal show={showModal} setShow={setShowModal} />
		</>
	);
}

type AboutModalProps = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function AboutModal({ show, setShow }: AboutModalProps) {
	const handleClose = () => setShow(false);
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header>
				<h3>What is this site?</h3>
			</Modal.Header>
			<Modal.Body>
				<p>This is a simple site showcasing the launch history of SpaceX.</p>
				<p>Click on one of the items to see the details of that launch.</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Got it
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
