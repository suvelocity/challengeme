import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary.js";
import Loading from "../../components/Loading";

const OneTeamPage = lazy(() => import("./OneTeam/TeamInfo"));
const OneTeacherPage = lazy(() => import("./OneTeacher"));
const MyTeams = lazy(() => import("./MyTeams"));
const NotFound = lazy(() => import("../../pages/NotFound"));
const TeamAssignments = lazy(() => import("./OneTeam/TeamAssignments"));

function Index() {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/teams/:id">
              <OneTeamPage />
            </Route>
            <Route exact path="/teams/tasks/:id">
              <TeamAssignments />
            </Route>
            <Route path="/teams/teacher/:id">
              <OneTeacherPage />
            </Route>
            <Route path="/teams">
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
