import React, { useEffect } from 'react';
import './App.css';
import mixpanel from 'mixpanel-browser';
import Router from './pages';

function App() {
  useEffect(() => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY);
    mixpanel.track('App Launched');
  }, []);

  return <Router />;
}

export default App;
