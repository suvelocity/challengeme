import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
          const { data } = await axios.get("/api/v1/auth/validate");
          setIsLogged(data);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          console.error(e);
        }
      } else {
        setLoading(false);
      }
    })();
  }, [cookies]);

  return (
    <BrowserRouter>
      {!loading ? 
        !logged ? 
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
        : 
          <Logged.Provider value={{ logged, setLogged }}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Logged.Provider>
      : <div></div>
      } 
    </BrowserRouter>
  );
}
