import React, { useEffect } from "react";
import "./App.css";
import Router from "./pages";
import mixpanel from 'mixpanel-browser';

function App() {
  useEffect(() => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY);
    mixpanel.track("App Launched");
  }, [])

  return <Router />;
}

export default App;
