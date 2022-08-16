import LaunchCard from "../LaunchCard/LaunchCard";
import Spinner from "react-bootstrap/Spinner";
import useLaunches from "../../hooks/useLaunches";
import styles from "./LaunchTable.module.css";
import Pages from "../Pages/Pages";

export default function LaunchTable() {
	const { loading, next, prev, numberOfPages, launches, page, goToPage } = useLaunches();

	const spinner = (
		<Spinner animation='border' role='status'>
			<span className='visually-hidden'>Loading...</span>
		</Spinner>
	);

	return (
		<div className={styles.table}>
			{loading ? spinner : launches?.map((launch) => <LaunchCard key={launch.id} {...launch} />)}
			<div onClick={prev}>Prev Page</div>
			<div>
				<Pages numberOfPages={numberOfPages} currentPage={page} goToPage={goToPage} />
			</div>
			<div onClick={next}>Next Page</div>
		</div>
	);
}
