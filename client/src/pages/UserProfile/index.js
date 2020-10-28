import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundry from "../../components/ErrorBoundry";
import Loading from "../../components/Loading/Loading";
import UserProfileLanding from "./UserProfileLanding";
import UserInfo from './PersonalDetails/UserInfo';
import MyChallenges from './MyChallenges/MyChallenges';

const NotFound = lazy(() => import("../../pages/NotFound"));

function Index() {

    return (
        <div  >
            <Suspense fallback={<Loading />}>
                <ErrorBoundry>
                    <Switch>
                        <Route exact path="/profile/mychallenges">
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
                </ErrorBoundry>
            </Suspense>
        </div>
    );
};

export default Index;