import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Header from '../components/Header';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
