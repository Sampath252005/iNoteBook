import react, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //add get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'), // Ensure the token is correctly retrieved
        },
      });
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
      }
  
      const json = await response.json();
  
      // Ensure the response is an array before setting it to state
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error('Expected an array of notes, but got:', json);
        setNotes([]); // Set notes to an empty array to avoid errors
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]); // Set notes to an empty array in case of an error
    }
  };
  //add a Note
  const addNote = async (title, description, tag) => {
    //TODO api calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note= await response.json();
    setNotes(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes=JSON.parse(JSON.stringify(notes))

    //LOGIC to Edit call
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNotes);
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
