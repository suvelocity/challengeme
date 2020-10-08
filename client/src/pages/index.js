import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom";
import { Logged } from "../context/LoggedInContext";
import Home from "./Home";
import Register from "./Register/Register";
import Login from "./Login";
import Cookies from "js-cookie";
import Forgot from "./Forgot/Forgot";
import VlidatingMail from './Register/VlidatingMail';
import network from '../services/network';

export default function Router() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (Cookies.get('accessToken')) {
        try {
          const { data } = await network.get("/api/v1/auth/validateToken");
          setLogged(data);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          console.error(e);
        }
      } else {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      {!loading ? 
        !logged ? 
          <Logged.Provider value={{ logged, setLogged }}>
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/auth">
                <VlidatingMail />
              </Route>
              <Route path="*">
                <Redirect to='/login' />
              </Route>
            </Switch>
          </Logged.Provider>
        : 
          <Logged.Provider value={{ logged, setLogged }}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <Redirect to='/' />
              </Route>
            </Switch>
          </Logged.Provider>
      : <div></div>
      } 
    </BrowserRouter>
  );
}