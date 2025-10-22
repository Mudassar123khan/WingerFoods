import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
function Login({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
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
              type="text"
              placeholder="enter your name (e.g. Aman)"
              required
            />
          )}
          <input
            type="email"
            placeholder="enter your email(e.g. aman@gmail.com)"
          />
          <input type="password" placeholder="password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
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
