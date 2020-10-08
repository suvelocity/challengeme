import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import AddImg from "../components/AddImg";
import Home from './Home';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}