import LaunchCard from "./LaunchCard";
import Spinner from "react-bootstrap/Spinner";
import useLaunches from "../hooks/useLaunches";
import Pages from "./Pages";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";

const Table = styled.div`
	display: grid;
	max-width: 60rem;
	margin: auto;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 30vh) auto;
	grid-template-areas: " . . . " " . spinner . " " . . . " " prev pages next ";
	gap: 1rem;
`;

const StyledRow = styled(Row)`
	max-width: 60rem;
`;

const StyledSpinner = styled(Spinner)`
	margin: 3rem auto 1rem;
`;

export default function LaunchTable() {
	const { loading, numberOfPages, launches, page, goToPage } = useLaunches();

	const spinner = (
		<StyledSpinner animation='border' role='status'>
			<span className='visually-hidden'>Loading...</span>
		</StyledSpinner>
	);

	return (
		<>
			<StyledRow xs='1' sm='2' md='3' className='g-3 mx-auto'>
				{loading
					? spinner
					: launches?.map((launch) => (
							<Col key={launch.id}>
								<LaunchCard {...launch} />
							</Col>
					  ))}
			</StyledRow>
			<Pages numberOfPages={numberOfPages} currentPage={page} goToPage={goToPage} />
		</>
	);
}
