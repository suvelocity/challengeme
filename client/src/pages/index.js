import React, {useState, useEffect} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from './Home';
import Header from '../components/header/Header'
import ThemeApi from '../services/Theme'
import Statistics from './Statistics';
import { Logged } from "../context/LoggedInContext";
import Register from "./Register/Register";
import Login from "./Login";
import Cookies from "js-cookie";
import Forgot from "./Forgot/Forgot";
import VlidatingMail from "./Register/VlidatingMail";
import network from "../services/network";
import Landing from "./Landing";
import { AnimatePresence } from "framer-motion";

  
  
  export default function Router() {
    const [darkTheme,setDarkTheme] = useState(false)
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setDarkTheme(true)
      }
    })

    useEffect(() => {// auth
      (async () => {
          if (Cookies.get("accessToken")) {
              try {
                  const { data } = await network.get(
                      "/api/v1/auth/validateToken"
                  );
                  setLogged(data);
                  setLoading(false);
              } catch (e) {
                  setLoading(false);
                  console.error(e);
              }
          } else {
              setLoading(false);
          }
      })();
  }, []);


    return (
        <BrowserRouter>
            {!loading ? (
                !logged ? (
                    <Logged.Provider value={{ logged, setLogged }}>
                        <AnimatePresence>
                            <Route
                                render={({ location }) => (
                                    <Switch
                                        location={location}
                                        key={location.pathname}
                                    >
                                        <Route exact path="/register">
                                            <Register />
                                        </Route>
                                        <Route exact path="/login">
                                            <Login />
                                        </Route>
                                        <Route exact path="/forgot">
                                            <Forgot />
                                        </Route>
                                        <Route exact path="/auth">
                                            <VlidatingMail />
                                        </Route>
                                        <Route exact path="/">
                                            <Landing />
                                        </Route>
                                        <Route path="*">
                                            <Redirect to="/" />
                                        </Route>
                                    </Switch>
                                )}
                            />
                        </AnimatePresence>
                    </Logged.Provider>
                ) : (
                    <Logged.Provider value={{ logged, setLogged }}>
                    <ThemeApi.Provider value={{darkTheme,setDarkTheme}}>
                        <Header/>
                          <Switch>
                            <Route exact path="/" >
                              <Home />
                            </Route>
                            <Route path="/statistics">
                              <Statistics />
                            </Route>
                            <Route path="*">
                                <Redirect to="/" />
                            </Route>
                          </Switch>
                        </ThemeApi.Provider>
                    </Logged.Provider>
                )
            ) : (
                <div></div>
            )}
        </BrowserRouter>
    );
}
