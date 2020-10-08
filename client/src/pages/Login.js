import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../services/network";
import { Logged } from '../context/LoggedInContext';

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({});

  const location = useHistory()

  const value = useContext(Logged);
  
  const updateField = (e) => {
    switch (e.currentTarget.name) {
      case "password":
        setPassword(e.currentTarget.value);
        break;
      case "userName":
        setUsername(e.currentTarget.value);
        break;
      case "rememberMe":
        setRememberMe((prevState) => !prevState);
        break;
    }
  };

  const loginFunc = async (e) => {
    const formErrors = {};
    e.preventDefault();
    if (/\W/.test(userName)) {
      formErrors.userName = "invalid userName";
    }
    if (userName.length < 6 || userName.length > 32) {
      formErrors.userName = "userName must be 6-32 characters long";
    }

    if (password.length < 5) {
      formErrors.password = "password must be at least 8 characters long";
    }
    if (formErrors.password || formErrors.userName) {
      setError(formErrors);
      return;
    }
    //request to server
    const { data: response } = await axios.post("/api/v1/auth/login", {
      userName: userName,
      password: password,
      rememberMe: rememberMe,
    });
    //if success -> set cookies
    if (response.message) {
      setError({ msg: response.message });
      return;
    }
    Cookies.set("accessToken", response.accessToken);
    Cookies.set("refreshToken", response.refreshToken);
    value.setLogged(true);
    location.push('/')
  };

  return (
    <div>
      <button>Log in with google</button>
      <button>Log in with github</button>
      <form onSubmit={loginFunc}>
        <input
          type="text"
          id="userName-field"
          name="userName"
          value={userName}
          required
          onChange={updateField}
        />
        <input
          type="password"
          id="password-field"
          name="password"
          value={password}
          required
          onChange={updateField}
        />
        <button type="submit" id="login-button">
          Login
        </button>
      </form>
      <label htmlFor="rememberMe">Remember Me: </label>
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        onChange={updateField}
      />
      <br />
      <span>don't have an account yet?</span>
      <Link to="/register">
        <button id="signUp">Sign up</button>
      </Link>
      <br />

      {
        <div style={{ backgroundColor: "red" }}>
          {error.userName || error.password || error.msg}
        </div>
      }
    </div>
  );
}
