import React,{useState,useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import ThemeApi from "../services/Theme"
import Header from '../components/Header/Header';
import NewChallengeForm from '../components/NewChallenge/NewChallengeForm';

export default function Router() {
  const [darkTheme,setDarkTheme] = useState(false)
  useEffect(() => {
    const previousTheme = localStorage.getItem("darkMode")
    if(previousTheme === "false"){
      setDarkTheme(false)
    }else if(previousTheme === "true"){
      setDarkTheme(true)
    }
    else{
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setDarkTheme(true)
      }
    }

  }, [])

  return (
    <ThemeApi.Provider value={{darkTheme,setDarkTheme}}>
    <BrowserRouter >
      <Header />
          <Switch  >
          <Route path="/add_challenge">
            <NewChallengeForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </BrowserRouter>
     </ThemeApi.Provider>


  );
}
