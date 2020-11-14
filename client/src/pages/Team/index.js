import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import OneTeamPage from './OneTeam'
import Loading from "../../components/Loading/Loading";

const NotFound = lazy(() => import("../../pages/NotFound"));
const MyTeams = lazy(() => import("./MyTeams/MyTeams"));
const TeamLandingPage = lazy(() => import("./TeamLandingPage"));

function Index() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/teams/:id">
              <OneTeamPage />
            </Route>
            <Route exact path="/teams">
              <MyTeams />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default Index;
