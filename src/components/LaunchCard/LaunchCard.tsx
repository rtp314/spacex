import { Launch } from "../../hooks/useLaunches";
import Card from "react-bootstrap/Card";
import styles from "./LaunchCard.module.css";

export default function LaunchCard(props: Launch) {
	return (
		<Card>
			<Card.Body>
				<Card.Title>
					{props.links.mission_patch_small && (
						<img
							className='me-2'
							style={{ height: "1.5rem" }}
							src={props.links.mission_patch_small}
							alt='mission patch'
						/>
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
