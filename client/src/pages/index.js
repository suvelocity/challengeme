import React,{useState,useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Header from '../components/Header';
import ThemeApi from "../services/Theme"


export default function Router() {
  const [darkTheme,setDarkTheme] = useState(false)
  useEffect(() => {
  
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setDarkTheme(true)
    }
    

  }, [])

  return (
    <ThemeApi.Provider value={{darkTheme,setDarkTheme}}>
    <BrowserRouter>
      <Header />
      <div className="main">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
     </ThemeApi.Provider>


  );
}
