import react, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState =(props) =>{
    const  notesInitial = [
            {
              "_id": "67c9d44770f8f4dee3f53210",
              "user": "67c59aa418bb6a71261f3af6",
              "title": "Book",
              "description": "Read a book",
              "tag": "Study",
              "createdAt": "2025-03-06T16:58:47.168Z",
              "updatedAt": "2025-03-06T16:58:47.168Z",
              "__v": 0
            },
            {
              "_id": "67cf18ea9dae62194f47bfa9",
              "user": "67c59aa418bb6a71261f3af6",
              "title": "Book On the Table",
              "description": "The Great king",
              "tag": "fantasy",
              "createdAt": "2025-03-10T16:52:58.005Z",
              "updatedAt": "2025-03-10T16:52:58.005Z",
              "__v": 0
            },
            {
              "_id": "67cf19019dae62194f47bfab",
              "user": "67c59aa418bb6a71261f3af6",
              "title": "Book On the Table..........",
              "description": "The Great king.......",
              "tag": "fantasy...........",
              "createdAt": "2025-03-10T16:53:21.970Z",
              "updatedAt": "2025-03-10T16:53:21.970Z",
              "__v": 0
            }
    ]
   const [notes,setNotes]= useState(notesInitial)
    return(
    <NoteContext.Provider value={{notes}}> 
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;
