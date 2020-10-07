import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Statistics from './Statistics';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}