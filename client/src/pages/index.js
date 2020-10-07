import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import AddChallenge from './AddChallenge.js';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add-challenge">
          <AddChallenge />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}