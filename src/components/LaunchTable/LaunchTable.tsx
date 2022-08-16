import LaunchCard from "../LaunchCard/LaunchCard";
import Spinner from "react-bootstrap/Spinner";
import useLaunches from "../../hooks/useLaunches";
import Pages from "../Pages/Pages";
import styled from "styled-components";

const Table = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(4, 1fr);
	gap: 1rem;
`;

export default function LaunchTable() {
	const { loading, next, prev, numberOfPages, launches, page, goToPage } = useLaunches();

	const spinner = (
		<Spinner animation='border' role='status'>
			<span className='visually-hidden'>Loading...</span>
		</Spinner>
	);

	return (
		<Table>
			{loading ? spinner : launches?.map((launch) => <LaunchCard key={launch.id} {...launch} />)}
			<div onClick={prev}>Prev Page</div>
			<div>
				<Pages numberOfPages={numberOfPages} currentPage={page} goToPage={goToPage} />
			</div>
			<div onClick={next}>Next Page</div>
		</Table>
	);
}
