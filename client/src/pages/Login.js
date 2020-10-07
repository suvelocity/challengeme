import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../services/network";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState([]);

  const updateField = (e) => {
    switch (e.currentTarget.name) {
      case "password":
        setPassword(e.currentTarget.value);
        break;
      case "username":
        setUsername(e.currentTarget.value);
        break;
      case "rememberMe":
        setRememberMe((prevState) => !prevState);
        break;
    }
  };

  useEffect(() => {
    console.log(rememberMe);
  }, [rememberMe]);

  const loginFunc = (e) => {
    const formErrors = {};
    e.preventDefault();
    if (/\W/.test(username)) {
      formErrors.username = "invalid username";
    }
    if (username.length < 6 || username.length > 32) {
      formErrors.username = "username must be 6-32 characters long";
    }

    if (password.length < 8) {
      formErrors.password = "password must be at least 8 characters long";
    }
    console.log(username);
    console.log(password);
    if (formErrors.password || formErrors.username) {
      console.log(formErrors);
      setError(formErrors);
      return;
    }
    //request to server
    axios.post("/loginEndPoint", { username: username, password: password });
    //if success -> set cookies
    let loggedIn = false;
    if (loggedIn) {
      Cookies.set("AT_Token", "fdkfmdkognfs");
      Cookies.set("RT_Token", "dfndgnr439r4j");
    } else {
      setError({ msg: "random server error" });
    }
    //redirect to home
    // <Route exact path="/">
    //     {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
    // </Route>

    //else print error to user
  };

  return (
    <div>
      <button>Log in with google</button>
      <button>Log in with github</button>
      <form onSubmit={loginFunc}>
        <input
          type="text"
          id="username-field"
          name="username"
          value={username}
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
          {error.username || error.password || error.msg}
        </div>
      }
    </div>
  );
}
