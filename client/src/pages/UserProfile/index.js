import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loading from "../../components/Loading/Loading";

const UserProfileLanding = lazy(() => import("./UserProfileLanding"));
const UserInfo = lazy(() => import("./PersonalDetails/UserInfo"));
const MyChallenges = lazy(() => import("./MyChallenges/MyChallenges"));
const NotFound = lazy(() => import("../../pages/NotFound"));

function Index() {

    return (
        <div  >
            <Suspense fallback={<Loading />}>
                <ErrorBoundary>
                    <Switch>
                        <Route exact path="/profile/MyChallenges">
                            <MyChallenges />
                        </Route>
                        <Route exact path="/profile/info">
                            <UserInfo />
                        </Route>
                        <Route exact path="/profile">
                            <UserProfileLanding />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </Suspense>
        </div>
    );
};

export default Index;