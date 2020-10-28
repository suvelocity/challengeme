import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
// import Cookies from "js-cookie";
// import network from "../../services/network";
import ErrorBoundry from "../../components/ErrorBoundry";
import Loading from "../../components/Loading/Loading";

const SubmissionsByUsers = lazy(() => import("./UsersStatus/SubmissionsByUsers"));
const SubmissionsByChallenges = lazy(() => import("./UsersStatus/SubmissionsByChallenges"));
const AdminLanding = lazy(() => import("./AdminLanding"));
const ProposedChallenge = lazy(() => import("./ChallengeApproval/ChallengeApproval"));
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