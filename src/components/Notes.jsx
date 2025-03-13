import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "../components/AddNote";
const Notes = () => {
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id:currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
  };
  const onChange = (e) => {
    setNote((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  };
  const ref = useRef(null);
  const refclose = useRef(null);
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
        ref={ref}
      >
        Open modal for @mdo
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit a Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    name="etitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((notes, index) => {
          return <NoteItem key={index} updateNote={updateNote} note={notes} />;
        })}
      </div>
    </>
  );
};

export default Notes;
