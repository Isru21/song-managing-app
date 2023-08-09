import Song from "./Song";

const Songs = ({ songs, deletesong, updatesong }) => {
  return (
    <div>
      {songs.map((song) => (
        <Song
          key={song._id}
          song={song}
          deletesong={deletesong}
          updatesong={updatesong}
        />
      ))}
    </div>
  );
};

export default Songs;
