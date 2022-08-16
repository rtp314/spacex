import { Launch } from "../../hooks/useLaunches";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const MissionPatchImg = styled.img`
	height: 1.5rem;
`;

export default function LaunchCard(props: Launch) {
	return (
		<Card>
			<Card.Body>
				<Card.Title>
					{props.links.mission_patch_small && (
						<MissionPatchImg className='me-2' src={props.links.mission_patch_small} alt='mission patch' />
					)}
					{props.mission_name}
				</Card.Title>
				<Card.Text>{props.launch_date_local.slice(0, 10)}</Card.Text>
			</Card.Body>
			<Card.Img
				variant='bottom'
				src={props.links.flickr_images[0] || props.links.mission_patch_small}
				height='200px'
				style={{ objectFit: "contain" }}
			/>
		</Card>
	);
}
