import styled from "styled-components";
import LaunchTable from "./components/LaunchTable";
import Navbar from "./components/Navbar";

const Footer = styled.footer`
	text-align: center;
	margin-top: 2rem;
	opacity: 0.5;
`;

function App() {
	return (
		<div className='App'>
			<Navbar />
			<LaunchTable />
			<Footer>
				Created by Samuel Reed <a href='https://rtp314.github.io'>rtp314.github.io</a>
			</Footer>
		</div>
	);
}

export default App;
