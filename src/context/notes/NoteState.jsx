import react, { useState } from "react";
import NoteContext from "./noteContext";
import { data } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //add get all Notes
  const getNotes = async () => {
    //TODO api calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjNTlhYTQxOGJiNmE3MTI2MWYzYWY2In0sImlhdCI6MTc0MTAyMDAyMX0.LrUrDc5rAqEUEIfMHJB4PiyDUthuLbRTp9xOQMy_JkY",
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //add a Note
  const addNote = async (title, description, tag) => {
    //TODO api calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjNTlhYTQxOGJiNmE3MTI2MWYzYWY2In0sImlhdCI6MTc0MTAyMDAyMX0.LrUrDc5rAqEUEIfMHJB4PiyDUthuLbRTp9xOQMy_JkY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const note = {
      _id: "67cf19019dae62194f47bfab",
      user: "67c59aa418bb6a71261f3af6",
      title: title,
      description: description,
      tag: tag,
      createdAt: "2025-03-10T16:53:21.970Z",
      updatedAt: "2025-03-10T16:53:21.970Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjNTlhYTQxOGJiNmE3MTI2MWYzYWY2In0sImlhdCI6MTc0MTAyMDAyMX0.LrUrDc5rAqEUEIfMHJB4PiyDUthuLbRTp9xOQMy_JkY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    //LOGIC to Edit call
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
