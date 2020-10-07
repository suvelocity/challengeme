import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Register from './Register/Register';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}