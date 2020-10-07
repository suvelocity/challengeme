import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './pages';
import Search from './components/Search';

function App() {
  return (
    <>
    <Search />
    <Router />
    </>
  );
}

export default App;
