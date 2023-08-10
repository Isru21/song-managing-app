import { useState, useEffect } from "react";
import Header from "./components/Header";
import Songs from "./components/Songs";
import Addsong from "./components/Addsong";

import { Outlet } from "react-router-dom";
import styled from "styled-components";

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

        setSongs((prevSongs) => prevSongs.filter((song) => song._id !== _id));

        console.log("Song deleted successfully!");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

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
      <Container>
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
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  background-color: rgba(17, 24, 39, 1);
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 0.75rem;
  color: rgba(243, 244, 246, 1);
`;
