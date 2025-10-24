import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axois from 'axios'
function Login({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  const {url,token,setToken} = useContext(StoreContext);
  //State variable for storing the user data
  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
  });

  //Function to set the data in the user state variable
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
}

 //Function to login the user
  const onLogin = async (event)=>{
    event.preventDefault();
    
    let newUrl = url;

    if(currState === "Login"){
      newUrl+="/api/user/login";
    }else{
      newUrl+="/api/user/register";
    }

    //sending request to the api along with the user data
    const response = await axois.post(newUrl,data);

    //Checking is the user is logged in or signed in or not
    if(response.data.success){
      setToken(response.data.token);  
      localStorage.setItem("token",response.data.token);  //storing the token so that when we come tommorow we don't have to login again
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }
  }
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="cross icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="enter your name (e.g. Aman)"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="enter your email(e.g. aman@gmail.com)"
          />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By contunuing, I agree to the terms of use and privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
