import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <div>
      <div className="container">
        <h2>Add a Note</h2>
        <form className="my-2">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <h2>Your Note</h2>
        <div>
        {notes.length === 0 ? (
          <p>No notes to display.</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="card my-2">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;
