import React, { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import Router from './pages';
import './styles/App.css';

function App() {
  useEffect(() => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY);
    mixpanel.track('App Launched');
  }, []);

  return <Router />;
}

export default App;
