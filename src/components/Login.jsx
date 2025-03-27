import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function Login(props) {
  let history=useNavigate();
  const[credential,setCredential]=useState({email:"",password:""})
  const onChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credential.email,password:credential.password}),
    });
    const json= await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Logged  succesfully","success")
      history("/");
    }
    else{
      props.showAlert("Invalid Credential","danger")
    }
  }
  return (
    <div>
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email1" value={credential.email} name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password1" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="exampleInputPassword1" value={credential.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Login</button>
</form>
    </div>
  )
}

export default Login
