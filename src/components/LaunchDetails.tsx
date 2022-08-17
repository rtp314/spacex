import Button from "react-bootstrap/Button";
import useLaunches from "../context/LaunchesContext";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const carouselHeight = "400px";

const DetailsWrapper = styled.div`
	max-width: 70ch;
	margin: 1rem auto;
`;

const StyledCarousel = styled(Carousel)`
	/* width: max-content; */
	height: ${carouselHeight};
	aspect-ratio: 4/3;
	background: #eee;
	margin: 2rem auto;
	display: grid;
	place-content: center;
`;

const CarouselImage = styled.img`
	object-fit: contain;
	object-position: center;
	max-height: ${carouselHeight};
`;

const ReadMore = styled.div`
	width: 100%;
	height: 3rem;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: end;
`;

export default function LaunchDetails() {
	const { loading, launches, selectedLaunchId } = useLaunches();
	const selectedLaunch = getLaunchDetails();

	function getLaunchDetails() {
		return launches.find((launch) => launch.id === selectedLaunchId);
	}

	if (loading || selectedLaunch === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<DetailsWrapper>
			<Button onClick={() => (window.location.hash = "")}>Back</Button>

			<h1 className='text-center mt-2'>{selectedLaunch.mission_name}</h1>
			<StyledCarousel fade variant='dark'>
				{selectedLaunch.links.flickr_images.length > 0 ? (
					selectedLaunch.links.flickr_images.map((img) => (
						<Carousel.Item>
							<CarouselImage src={img} />
						</Carousel.Item>
					))
				) : (
					<Carousel.Item className='w-100 h-100'>
						<CarouselImage src={selectedLaunch.links.mission_patch_small} />
					</Carousel.Item>
				)}
			</StyledCarousel>
			<h4 className='text-center'>Launch Details</h4>
			<p className='text-center'>
				<em>Launched at: {selectedLaunch.launch_date_local}</em>
			</p>
			<p>{selectedLaunch.details}</p>
			<ReadMore>
				<Button variant='light bg-white'>More Information</Button>
			</ReadMore>
			<Button className='mt-3' onClick={() => (window.location.hash = "")}>
				Back
			</Button>
		</DetailsWrapper>
	);
}
