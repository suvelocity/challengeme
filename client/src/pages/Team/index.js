import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundry from "../../components/ErrorBoundry";
import Loading from "../../components/Loading/Loading";

const NotFound = lazy(() => import("../../pages/NotFound"));
const MyTeams = lazy(() => import("./MyTeams/MyTeams"));
const TeamLandingPage = lazy(() => import("./TeamLandingPage"));

function Index() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ErrorBoundry>
          <Switch>
            <Route exact path="/team/myteams">
              <MyTeams />
            </Route>
            <Route exact path="/team">
              <TeamLandingPage />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundry>
      </Suspense>
    </div>
  );
}

export default Index;
