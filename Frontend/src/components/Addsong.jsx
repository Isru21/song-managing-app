import React, { useState } from "react";
import styled from "styled-components";

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
        },
        body: JSON.stringify(newSong),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Call the onAdd function passed as a prop to update the parent component's state
      onAdd(data);

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

      setname("");
      setartist("");
      setreminder(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <AddForm onSubmit={_id === "" ? onCreatesubmit : onUpdatesubmit}>
      <FormControl>
        <Label>Song name</Label>
        <Input
          type="text"
          placeholder="Add song name"
          value={text}
          onChange={(e) => setname(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <Label>Artist</Label>
        <Input
          type="text"
          placeholder="Add artist"
          value={artist}
          onChange={(e) => setartist(e.target.value)}
        />
      </FormControl>

      <ButtonBlock type="submit" value="Save Song" />
    </AddForm>
  );
};

export default Addsong;

const AddForm = styled.form`
  margin-bottom: 40px;
`;

const FormControl = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
`;

const Button = styled.input`
  display: inline-block;
  background-color: rgba(197, 62, 62, 0.821);

  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    background-color: rgba(167, 139, 250, 1);
  }
`;

const ButtonBlock = styled(Button)`
  display: block;
  width: 100%;
`;
