import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/challenges/:challengeId">
          <ChallengePage/>
        </Route>

        
      </Switch>
    </BrowserRouter>
  );
}