import React, { lazy, Suspense } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import ErrorBoundary from "../../../components/ErrorBoundary.js";
import Loading from "../../../components/Loading";
import SecondHeader from '../../../components/Header/SecondHeader';

const NotFound = lazy(() => import("../../NotFound"));
const DashBoard = lazy(() => import("./DashBoard"));
const TeamControl = lazy(() => import("./TeamControl/index"));
const StudentInfo = lazy(() => import("./StudentsInfo"));
const Assignments = lazy(() => import("./Assignments"));

function Index({ darkMode }) {

    const { id } = useParams();

    const paths = [
        { name: "DashBoard", URL: `/teams/teacher/${id}` },
        { name: "Team Control", URL: `/teams/teacher/${id}/TeamControl` },
        { name: "Students Information", URL: `/teams/teacher/${id}/StudentsInfo` },
        { name: "Assignments", URL: `/teams/teacher/${id}/Assignments` },
    ];

    return (
        <div>
            <SecondHeader paths={paths} darkMode={darkMode} />
            <Suspense fallback={<Loading />}>
                <ErrorBoundary>
                    <Switch>
                        <Route exact path="/teams/teacher/:id/TeamControl">
                            <TeamControl darkMode={darkMode} teamId={id} />
                        </Route>
                        <Route exact path="/teams/teacher/:id/StudentsInfo">
                            <StudentInfo darkMode={darkMode} />
                        </Route>
                        <Route exact path="/teams/teacher/:id/Assignments">
                            <Assignments darkMode={darkMode} />
                        </Route>
                        <Route exact path="/teams/teacher/:id">
                            <DashBoard darkMode={darkMode} />
                        </Route>
                        <Route path="*">
                            <NotFound darkMode={darkMode} />
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </Suspense>
        </div>
    );
}

export default Index;
