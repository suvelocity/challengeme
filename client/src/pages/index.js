import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Logged } from "../context/LoggedInContext";
import AllChallenges from "../context/AllChallengesContext";
import FilteredLabels from "../context/FilteredLabelsContext";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Cookies from "js-cookie";
import Forgot from "../components/ForgotPassword";
import ValidatingMail from "./Authentication/Register/ValidatingMail";
import GithubAuth from "./Authentication/GithubAuth";
import GoogleAuth from "../services/GoogleAuth";
import network from "../services/network";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import Loading from "../components/Loading";
import NewChallengeForm from "./NewChallenge";
import UserProfile from "./UserProfile";
import Admin from "./Admin";
import Team from "./Team";
import PrivateRoute from '../Routes/privateRoute'
import PublicRoute from '../Routes/publicRoute'
import '../styles/Admin.css'


const NotFound = lazy(() => import("../pages/NotFound"));
const Challenges = lazy(() => import("./Challenges"));
const LandingPage = lazy(() => import("./LandingPage"));
const ChallengePage = lazy(() => import("./OneChallenge"));

export default function Router() {
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: challengesFromServer } = await network.get("/api/v1/challenges");
        typeof challengesFromServer === "object" && setChallenges(challengesFromServer);
      } catch { }
    })();
  }, [logged]);

  useEffect(() => {
    // auth
    (async () => {
      try {
        if (Cookies.get("accessToken")) {
          const { data } = await network.get("/api/v1/auth/validate-token");
          setLogged(data);
          setIsAdmin(data.isAdmin)
          setLoading(false);
        } else if (Cookies.get("refreshToken")) {
          await network.post('/api/v1/auth/token', { token: Cookies.get('refreshToken') });
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      {!loading ? (
        <Logged.Provider value={{ logged, isAdmin, setLogged, setIsAdmin }}>
          <AllChallenges.Provider value={{ challenges, setChallenges }}>
            <FilteredLabels.Provider value={{ filteredLabels, setFilteredLabels }}>
              <Header />
              <div className={ "light"}>
                <Suspense fallback={<Loading />}>
                  <ErrorBoundary>
                    <Switch>
                      <Route exact={true} path="/" component={LandingPage} />
                      <Route exact={true} path="/challenges" component={Challenges} />
                      <Route exact={true} path="/challenges/:id" render={() => <ChallengePage  />} />
                      <PublicRoute exact={true} path="/register" component={Register} />
                      <PublicRoute exact={true} path="/login" component={Login} />
                      <PublicRoute exact={true} path="/forgot" component={Forgot} />
                      <PublicRoute exact={true} path="/auth" component={ValidatingMail} />
                      <PublicRoute exact={true} path="/github-auth" component={GithubAuth} />
                      <PublicRoute exact={true} path="/google-auth" component={GoogleAuth} />
                      <PrivateRoute exact={true} path="/addnewchallenge" component={NewChallengeForm}  />
                      <PrivateRoute path="/profile" component={UserProfile} />
                      <PrivateRoute path="/teams" component={Team}  />
                      {isAdmin && (
                        <PrivateRoute path="/admin" component={Admin} />
                      )}
                      <Route path="*" component={NotFound} />
                    </Switch>
                  </ErrorBoundary>
                </Suspense>
              </div>
            </FilteredLabels.Provider>
          </AllChallenges.Provider>
        </Logged.Provider>
      ) : (
          <Loading firstLoading={true} />
        )}
    </BrowserRouter>
  );
}
