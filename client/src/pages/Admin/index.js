import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import network from "../../services/network";
import ErrorBoundry from "../../components/ErrorBoundry";
import ProposedChallenge from "./ChallengeApproval/ChallengeApproval";
import Loading from "../../components/Loading/Loading";
import SubmissionsByChallenges from './UsersStatus/SubmissionsByChallenges';
import SubmissionsByUsers from './UsersStatus/SubmissionsByUsers';
import AdminLanding from './AdminLanding';
const NotFound = lazy(() => import("../../pages/NotFound"));

function Index() {

    const checkAdminPerimsions = async () => {
        alert('admin area')
    }

    useEffect(() => {
        checkAdminPerimsions()
    }, [])

    return (
        <div  >
            <Suspense fallback={<Loading />}>
                <ErrorBoundry>
                    <Switch>
                        <Route exact path="/admin/SubmissionsByUsers">
                            <SubmissionsByUsers />
                        </Route>
                        <Route exact path="/admin/SubmissionsByChallenges">
                            <SubmissionsByChallenges />
                        </Route>
                        <Route exact path="/admin/proposedChallenges">
                            <ProposedChallenge />
                        </Route>
                        <Route exact path="/admin">
                            <AdminLanding />
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