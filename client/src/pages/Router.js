import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import moduleName from ".";
import ChallengePage from "./../components/ChallengePage/ChallengePage";
import Home from "./Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route
          exact
          path='/challenges/:challengeId'
          component={ChallengePage}
        />
      </Switch>
    </BrowserRouter>
  );
}
