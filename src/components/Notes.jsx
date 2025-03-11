import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
const Notes = () => {
    const context = useContext(noteContext);
    const { notes,addNote} = context;
  
  return (
    <>
     <AddNote/>
    <div className='row my-3'>
    <h2>Your Note</h2> 
    {
        notes.map((notes,index)=>{
            return <NoteItem key={index} note={notes}/>
        })
    }
  </div>
  </>
  )
}

export default Notes