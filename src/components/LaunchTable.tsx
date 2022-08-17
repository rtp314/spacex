import LaunchCard from "./LaunchCard";
import Spinner from "react-bootstrap/Spinner";
import useLaunches from "../context/LaunchesContext";
import Pages from "./Pages";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import rocketGif from "../assets/giphy-rocket.gif";

const StyledRow = styled(Row)`
	margin-top: 0.5rem;
	max-width: 60rem;
`;

const Loader = styled.div`
	margin: 3rem auto 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	img {
		width: 10rem;
	}
`;

export default function LaunchTable() {
	const { loading, numberOfPages, launches, page, goToPage } = useLaunches();

	const loaderContents = (
		<>
			{/* <img src={rocketGif} alt='loading' /> */}
			<div className='fs-3'>
				Loading...
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		</>
	);

	return (
		<>
			<StyledRow xs='1' sm='2' md='3' className='g-3 mx-auto'>
				{loading ? (
					<Loader>{loaderContents}</Loader>
				) : (
					launches?.map((launch) => (
						<Col key={launch.id}>
							<LaunchCard {...launch} />
						</Col>
					))
				)}
			</StyledRow>
			<Pages numberOfPages={numberOfPages} currentPage={page} goToPage={goToPage} />
		</>
	);
}
