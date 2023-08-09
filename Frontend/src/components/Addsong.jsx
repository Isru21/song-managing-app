import React, { useState } from "react";

const Addsong = ({ onAdd, songartist, songName, _id }) => {
  const [text, setname] = useState(songName);
  const [artist, setartist] = useState(songartist);
  const [reminder, setreminder] = useState(false);

  const onCreatesubmit = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");
    let tokenString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
    }
    const bearerToken = tokenString;
    // Check if both the song name and artist are entered
    if (!text || !artist) {
      alert("Please enter both the song name and artist.");
      return;
    }

    // Create a new song object with the entered data
    const newSong = {
      text: text,
      artist: artist,
      reminder: reminder,
    };

    try {
      // Send the POST request to add the new song
      const response = await fetch("http://localhost:5000/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
          // Here you can set the Authorization header if needed
        },
        body: JSON.stringify(newSong),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the server returns the new song object after adding it
      const data = await response.json();

      // Call the onAdd function passed as a prop to update the parent component's state
      onAdd(data);

      // Clear the input fields after successful addition
      setname("");
      setartist("");
      setreminder(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onUpdatesubmit = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");
    let tokenString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
    }
    const bearerToken = tokenString;
    // Check if both the song name and artist are entered
    if (!text || !artist) {
      alert("Please enter both the song name and artist.");
      return;
    }

    // Create a new song object with the entered data
    const newSong = {
      text: text,
      artist: artist,
      reminder: reminder,
    };

    try {
      // Send the POST request to add the new song
      const response = await fetch(`http://localhost:5000/api/songs/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
          // Here you can set the Authorization header if needed
        },
        body: JSON.stringify(newSong),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = "/songs";
      // Assuming the server returns the new song object after adding it
      const data = await response.json();

      // Call the onAdd function passed as a prop to update the parent component's state
      onAdd(data);

      // Clear the input fields after successful addition
      setname("");
      setartist("");
      setreminder(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <form
      className="add-form"
      onSubmit={_id === "" ? onCreatesubmit : onUpdatesubmit}
    >
      <div className="form-control">
        <label>Song name</label>
        <input
          type="text"
          placeholder="Add song name"
          value={text}
          onChange={(e) => setname(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Artist</label>
        <input
          type="text"
          placeholder="Add artist"
          value={artist}
          onChange={(e) => setartist(e.target.value)}
        />
      </div>

      {/* <div className="form-control form-control-check">
        <label>Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setreminder(e.currentTarget.checked)}
        />
      </div> */}
      <input type="submit" value="Save Song" className="btn btn-block" />
    </form>
  );
};

export default Addsong;
