import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loading from "../../components/Loading";
import SecondHeader from "../../components/Header/SecondHeader";

const UserProfileLanding = lazy(() => import("./UserProfileLanding"));
const UserInfo = lazy(() => import("./PersonalDetails"));
const MyChallenges = lazy(() => import("./MyChallenges"));
const NotFound = lazy(() => import("../../pages/NotFound"));

function Index( darkTheme) {
  const paths = [
    { name: "Profile Info", URL: "/profile/info" },
    { name: "My Challenges", URL: "/profile/MyChallenges" },
  ];

  return (
    <div>
      <SecondHeader paths={paths} darkTheme={darkTheme}/>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/profile/MyChallenges">
              <MyChallenges />
            </Route>
            <Route exact path="/profile/info">
              <UserInfo />
            </Route>
            {/* <Route exact path="/profile">
              <UserProfileLanding />
            </Route> */}
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
