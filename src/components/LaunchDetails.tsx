import Button from "react-bootstrap/Button";
import useLaunches from "../context/LaunchesContext";

export default function LaunchDetails() {
	const { loading, launches, selectedLaunchId } = useLaunches();
	const selectedLaunch = getLaunchDetails();

	function getLaunchDetails() {
		return launches.find((launch) => launch.id === selectedLaunchId);
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{JSON.stringify(selectedLaunch)}
			<Button onClick={() => (window.location.hash = "")}>Back</Button>
		</div>
	);
}
