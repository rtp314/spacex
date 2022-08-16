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

const PrevCol = styled(Col)`
	text-align: right;
`;

const NextCol = styled(Col)``;

export default function LaunchTable() {
	const { loading, next, prev, numberOfPages, launches, page, goToPage } = useLaunches();

	const spinner = (
		<Spinner animation='border' role='status' style={{ gridArea: "spinner", margin: "auto" }}>
			<span className='visually-hidden'>Loading...</span>
		</Spinner>
	);

	return (
		<>
			<StyledRow lg='3' className='g-3 mx-auto'>
				{loading
					? spinner
					: launches?.map((launch) => (
							<Col key={launch.id}>
								<LaunchCard {...launch} />
							</Col>
					  ))}
			</StyledRow>
			<StyledRow lg='3' className='g-3 mx-auto my-3 fs-3 align-items-center'>
				<PrevCol onClick={prev}>Prev Page</PrevCol>
				<Col>
					<Pages numberOfPages={numberOfPages} currentPage={page} goToPage={goToPage} />
				</Col>
				<NextCol onClick={next}>Next Page</NextCol>
			</StyledRow>
		</>
	);
}
