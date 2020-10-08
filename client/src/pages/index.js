import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Header from '../components/Header';
import AddChallenge from './AddChallenge.js';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/">
     addCardToHomePage
          <Home />
        </Route>
        <Route path="/add-challenge">
          <AddChallenge />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
