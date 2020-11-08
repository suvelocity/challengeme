import React, { useEffect, useContext, lazy, Suspense } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Logged } from "../../context/LoggedInContext";
import ErrorBoundry from "../../components/ErrorBoundry";
import Loading from "../../components/Loading/Loading";
import network from "../../services/network";
import Cookies from "js-cookie";

const GithhubTokens = lazy(() => import("./GithhubTokens/GithhubTokens"))
const SubmissionsByUsers = lazy(() => import("./UsersStatus/SubmissionsByUsers"));
const SubmissionsByChallenges = lazy(() => import("./UsersStatus/SubmissionsByChallenges"));
const AdminLanding = lazy(() => import("./AdminLanding"));
const ProposedChallenge = lazy(() => import("./ChallengeApproval/ChallengeApproval"));
const UsersControl = lazy(() => import('./UsersControl/UsersControl'));
const NotFound = lazy(() => import("../../pages/NotFound"));

function Index() {

    const location = useHistory();
    const loggedContext = useContext(Logged);

    const checkAdminPerimsions = async () => {
        if (Cookies.get("accessToken")) {
            try {
                const { data } = await network.get("/api/v1/auth/validateAdmin");
                console.log(data);
            } catch (error) {
                console.error(error);
                Cookies.remove("refreshToken");
                Cookies.remove("accessToken");
                Cookies.remove("name");
                Cookies.remove("userId");
                Cookies.remove("isAdmin");
                Cookies.remove("userName");
                loggedContext.setLogged(false);
                location.push("/");
            }
        } else {
            Cookies.remove("refreshToken");
            Cookies.remove("accessToken");
            Cookies.remove("name");
            Cookies.remove("userId");
            Cookies.remove("isAdmin");
            Cookies.remove("userName");
            loggedContext.setLogged(false);
            location.push("/");
        }
    }

    useEffect(() => {
        checkAdminPerimsions()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Suspense fallback={<Loading />}>
                <ErrorBoundry>
                    <Switch>
                        <Route exact path="/admin/SubmissionsByUsers">
                            <SubmissionsByUsers />
                        </Route>
                        <Route exact path="/admin/SubmissionsByChallenges">
                            <SubmissionsByChallenges />
                        </Route>
                        <Route exact path="/admin/ChallengesManagement">
                            <ProposedChallenge />
                        </Route>
                        <Route exact path="/admin/UsersControl">
                            <UsersControl />
                        </Route>
                        <Route exact path="/admin/GithhubTokens">
                            <GithhubTokens />
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
        </>
    );
};

export default Index;