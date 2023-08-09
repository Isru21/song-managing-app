import { FaTimes } from "react-icons/fa";

const Song = ({ song, deletesong, updatesong }) => {
  return (
    <div
      className="task"
      onClick={() => updatesong(song._id, song.text, song.artist)}
    >
      <p>{song.artist}</p>
      <h3>
        {song.text}{" "}
        <FaTimes
          className="hover"
          style={{ cursor: "pointer" }}
          onClick={() => deletesong(song._id)}
        />
      </h3>

      {/* onClick={()=> updatesong(song.id)} */}
    </div>
  );
};

export default Song;
