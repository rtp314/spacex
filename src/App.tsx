import styled from "styled-components";
import LaunchDetails from "./components/LaunchDetails";
import LaunchTable from "./components/LaunchTable";
import Navbar from "./components/Navbar";
import { LaunchesContextProvider } from "./context/LaunchesContext";
import useHashNavigate from "./hooks/useHashNavigate";

const Footer = styled.footer`
	text-align: center;
	margin-top: 2rem;
	opacity: 0.5;
`;

function App() {
	const hash = useHashNavigate();

	return (
		<div className='App'>
			<Navbar />
			<LaunchesContextProvider>{hash === "" ? <LaunchTable /> : <LaunchDetails />}</LaunchesContextProvider>
			<Footer>
				Created by Samuel Reed <a href='https://rtp314.github.io'>rtp314.github.io</a>
			</Footer>
		</div>
	);
}

export default App;
