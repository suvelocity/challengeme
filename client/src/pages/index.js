import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Logged } from "../context/LoggedInContext";
import Home from "./Home";
import Register from "./Register/Register";
import Login from "./Login";
import Forgot from "./Forgot/Forgot";
import VlidatingMail from './Register/VlidatingMail';


export default function Router() {
  const [logged, setLogged] = useState(false);

  return (
    <BrowserRouter>
      {!logged ? (
        <Logged.Provider value={{ logged, setLogged }}>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/auth">
              <VlidatingMail />
            </Route>
          </Switch>
        </Logged.Provider>
      ) : (
        <Logged.Provider value={{ logged, setLogged }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Logged.Provider>
      )}
    </BrowserRouter>
  );
}
