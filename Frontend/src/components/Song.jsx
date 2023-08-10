import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Song = ({ song, deletesong, updatesong }) => {
  return (
    <Task onClick={() => updatesong(song._id, song.text, song.artist)}>
      <ArtistName>{song.artist}</ArtistName>
      <Songname>
        {song.text}
        <HoverIcon onClick={() => deletesong(song._id)} />
      </Songname>
    </Task>
  );
};

export default Song;

const Task = styled.div`
  background: rgba(167, 139, 250, 1);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 0.375rem;
`;

const HoverIcon = styled(FaTimes)`
  cursor: pointer;
  color: rgba(197, 62, 62, 0.821);
  &:hover {
    color: red;
  }
`;
const Songname = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ArtistName = styled.p``;
