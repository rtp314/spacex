import { Launch } from "../hooks/useLaunches";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const MissionPatchImg = styled.img`
	height: 1.5rem;
`;

const StyledCard = styled(Card)`
	height: 20rem;
`;

const StyledCardImg = styled(Card.Img)`
	height: 100%;
	object-fit: cover;
`;

const StyledOverlay = styled(Card.ImgOverlay)`
	background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1));
`;

export default function LaunchCard(props: Launch) {
	return (
		<StyledCard className='shadow-sm'>
			<StyledCardImg src={props.links.flickr_images[0] || props.links.mission_patch_small} />
			<StyledOverlay className='text-white'>
				<Card.Title>
					{props.links.mission_patch_small && (
						<MissionPatchImg className='me-2' src={props.links.mission_patch_small} alt='mission patch' />
					)}
					{props.mission_name}
				</Card.Title>
				<Card.Text>{props.launch_date_local.slice(0, 10)}</Card.Text>
			</StyledOverlay>
		</StyledCard>
	);
}
