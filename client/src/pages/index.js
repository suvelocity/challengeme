import React, {useState, useEffect} from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Header from '../components/header/Header'
import ThemeApi from '../services/Theme'
import Statistics from './Statistics';


  
  
  export default function Router() {
    const [darkTheme,setDarkTheme] = useState(false)
    useEffect(() => {
    
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setDarkTheme(true)
      }
    })
  return (
    <ThemeApi.Provider value={{darkTheme,setDarkTheme}}>
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
     </ThemeApi.Provider>


  );
}
