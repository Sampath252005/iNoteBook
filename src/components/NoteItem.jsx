import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote} = context;
  const { note } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-trash mx-3 fs-4" onClick={()=>{
              deleteNote(note._id)
            }}></i>
            <i className="fa-solid fa-pen-to-square mx-2 fs-4"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
