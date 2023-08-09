import { useState, useEffect } from "react";
import Header from "./components/Header";
import Songs from "./components/Songs";
import Addsong from "./components/Addsong";

import { Outlet } from "react-router-dom";
// import Updatesong from "./components/Updatesong";

function App() {
  const [showAddSong, setshowAddSong] = useState(false);
  const [songName, setsongName] = useState("");
  const [artist, setartist] = useState("");
  const [id, setid] = useState("");
  const [user, setuser] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    let tokenString = "";
    let userString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
      userString = tokenObject.name;
    }

    const bearerToken = tokenString;
    const userName = userString;
    setuser(userName);

    fetch("http://localhost:5000/api/songs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json().then((data) => {
          setSongs(data);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const [songs, setSongs] = useState([]);
  // deleting song function
  const deletesong = (_id) => {
    const storedToken = localStorage.getItem("token");
    let tokenString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
    }

    const bearerToken = tokenString;

    fetch(`http://localhost:5000/api/songs/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Make a DELETE request to the server to delete the song with the given _id
        // Then update the state to remove the deleted song from the songs array
        setSongs((prevSongs) => prevSongs.filter((song) => song._id !== _id));

        // response.json().then((data) => {
        //   setdeleteSong(data);
        // });
        console.log("Song deleted successfully!");
        // Handle the deletion from the UI (if needed)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Adding song function
  const addsong = (song) => {
    const newSong = { ...song };
    setSongs([...songs, newSong]);
  };

  const updatesong = (_id, name, artist) => {
    setid(_id);
    setartist(name);
    setsongName(artist);
    setshowAddSong(!showAddSong);
    //----------------------------
  };

  //-----------------------------

  //-----------------------------
  return (
    <div>
      <div className="container">
        <Outlet />
        <Header
          onAdd={() => {
            setshowAddSong(!showAddSong);
            setartist("");
            setsongName("");
            setid("");
          }}
          change={showAddSong}
          userId={user}
        />
        {showAddSong && (
          <Addsong
            onAdd={addsong}
            songName={songName}
            songartist={artist}
            _id={id}
          />
        )}

        <Songs songs={songs} deletesong={deletesong} updatesong={updatesong} />
        <p>Click to Update a song</p>
      </div>
    </div>
  );
}

export default App;
