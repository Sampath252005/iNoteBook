
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import React,{useState} from "react";


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <div className="container">
           <Alert alert={alert} /> 
           </div>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/> } />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login showAlert={showAlert}/>} />
              <Route path="/SignUp" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
