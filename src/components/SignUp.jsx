import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const SingUp = (props) => {
  const[credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""})
  let history=useNavigate();
  const onChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password,cpassword}=credential;
    if (password !== cpassword) {
     alert("password is not matching")
      return;
    }
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json= await response.json();
    console.log(json.success,json);
    if(json.success){
      //save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
      history("/");
      props.showAlert("Account Created succesfully","success")
    }
    else{
      props.showAlert("Invalid Credential","danger")
    }
  }

  return (
    <div>
      <form onSubmit={handlesubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email1"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
          Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="exampleInputconfirmPassword1"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SingUp;
