import { Launch } from '../context/LaunchesContext';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import useLaunches from '../context/LaunchesContext';

const MissionPatchImg = styled.img`
  height: 1.5rem;
`;

const StyledCard = styled(Card)`
  height: 20rem;
  overflow: hidden;
  img {
    transform: scale(1);
    transition: all 500ms ease;
  }
  .hidden {
    transform: translateX(-120%);
    transition: all 500ms ease;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
    .hidden {
      transform: translateX(0);
    }
  }
`;

const StyledCardImg = styled(Card.Img)`
  height: 100%;
  object-fit: cover;
`;

const StyledOverlay = styled(Card.ImgOverlay)`
  background: linear-gradient(rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.1) 50%);
  color: white;
`;

export default function LaunchCard({ id, details, name, links, date_local }: Launch) {
  const { setSelectedLaunchId } = useLaunches();

  function handleClick() {
    window.location.hash = id;
    setSelectedLaunchId(id);
  }

  return (
    <StyledCard className="shadow-sm" onClick={handleClick}>
      <StyledCardImg src={links.flickr?.small?.[0] || links.patch.small} />
      <StyledOverlay>
        <Card.Title>
          {links.patch.small && <MissionPatchImg className="me-2" src={links.patch.small} alt="mission patch" />}
          {name}
        </Card.Title>
        <Card.Text>{date_local.slice(0, 10)}</Card.Text>
        <Card.Text className="hidden">{details || '(No launch description)'}</Card.Text>
      </StyledOverlay>
    </StyledCard>
  );
}
