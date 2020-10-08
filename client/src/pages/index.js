import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Header from '../components/header/Header'

import Statistics from './Statistics';

export default function Router() {
  return (
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}