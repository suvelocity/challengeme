import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Logged } from "../context/LoggedInContext";
import AllChallenges from "../context/AllChallengesContext";
import FilteredLabels from "../context/FilteredLabelsContext";
import Register from "./Authentication/Register/Register";
import Login from "./Authentication/Login";
import Cookies from "js-cookie";
import Forgot from "./Authentication/ForgotPasswordPage/Forgot";
import ValidatingMail from "./Authentication/Register/ValidatingMail";
import network from "../services/network";
import Landing from "./Authentication/Landing";
import { AnimatePresence } from "framer-motion";
import Header from "../components/Header/Header";
import ErrorBoundry from "../components/ErrorBoundry";
import Loading from "../components/Loading/Loading";
import "../index.css";
import NewChallengeForm from "./NewChallenge/NewChallengeForm"
import UserProfile from "./UserProfile";
import Admin from "./Admin";


const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("./Home/Home"));
const ChallengePage = lazy(() => import("./OneChallenge/ChallengePage"));

export default function Router() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);

  useEffect(() => {
    if (logged) {

      const previousTheme = localStorage.getItem("darkMode"); //get previous selected theme
      if (Cookies.get("isAdmin") === 'admin') {
        console.log('I AM ADMIN NOW YAY')
        setIsAdmin(true);
      }

      if (previousTheme === "false") {
        setDarkTheme(false);
      } else if (previousTheme === "true") {
        setDarkTheme(true);
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          //check default theme of the user
          setDarkTheme(true);
        }
      }
    }
    (async () => {
      try {
        const { data: challengesFromServer } = await network.get(
          "/api/v1/challenges"
        );
        typeof challengesFromServer === "object" &&
          setChallenges(challengesFromServer);
      } catch { }
    })();
  }, [logged]);

  useEffect(() => {
    // auth
    (async () => {
      if (Cookies.get("accessToken")) {
        try {
          const { data } = await network.get("/api/v1/auth/validateToken");
          setLogged(data);
          setLoading(false);
        } catch (e) {
          setLoading(false);
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
              <ErrorBoundry>
                <Route
                  render={({ location }) => (
                    <Switch location={location} key={location.pathname}>
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
                        <ValidatingMail />
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
              </ErrorBoundry>
            </AnimatePresence>
          </Logged.Provider>
        ) : (
            <Logged.Provider value={{ logged, setLogged }}>
              <AllChallenges.Provider value={{ challenges, setChallenges }}>
                <FilteredLabels.Provider
                  value={{ filteredLabels, setFilteredLabels }}
                >
                  <Header darkMode={darkTheme} setDarkMode={setDarkTheme} />
                  <div className={darkTheme ? "dark" : "light"}>
                    <Suspense fallback={<Loading darkMode={darkTheme} />}>
                      <ErrorBoundry>
                        <Switch>
                          <Route exact path="/challenges/:id">
                            <ChallengePage darkMode={darkTheme} />
                          </Route>
                          <Route path="/profile">
                            <UserProfile darkMode={darkTheme} />
                          </Route>
                          <Route exact path="/addnewchallenge">
                            <NewChallengeForm />
                          </Route>
                          {isAdmin &&
                            <Route path="/admin">
                              <Admin />
                            </Route>
                          }
                          <Route exact path="/">
                            <Home />
                          </Route>
                          <Route path="*">
                            <NotFound />
                          </Route>
                        </Switch>
                      </ErrorBoundry>
                    </Suspense>
                  </div>
                </FilteredLabels.Provider>
              </AllChallenges.Provider>
            </Logged.Provider>
          )
      ) : (
          <Loading firstLoading={true} />
        )}
    </BrowserRouter>
  );
}
