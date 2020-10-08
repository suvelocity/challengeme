import React, { useState } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Register from './Register/Register';
import Login from './Login';

export default function Router() {
  const [logged, setLogged] = useState(false);

  return (
    <BrowserRouter>
      {!logged ? 
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        {/* <Route path="/login">
          <Register />
        </Route> */}
      </Switch> :
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    }
    </BrowserRouter>
  );
}