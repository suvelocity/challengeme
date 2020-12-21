import React, { useEffect, useContext, lazy, Suspense } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Logged } from "../../../context/LoggedInContext";
import ErrorBoundary from "../../../components/ErrorBoundary";
import Loading from "../../../components/Loading";
import network from "../../../services/network";
import Cookies from "js-cookie";
import SecondHeader from "../../../components/Header/SecondHeader";

const NotFound = lazy(() => import("../../../pages/NotFound"));
const AccessKeyControl = lazy(() => import("./AccessKey/index"));
const ErrorControl = lazy(() => import("./ErrorControl/index"));
const EventsControl = lazy(() => import("./EventsControl/index"));
const TeamsControl = lazy(() => import("./TeamsControl/index"));

function Index({ darkMode }) {
  const location = useHistory();
  const loggedContext = useContext(Logged);

  const checkAdminPermissions = async () => {
    if (Cookies.get("accessToken")) {
      try {
        await network.get("/api/v1/auth/validate-admin");
      } catch (error) {
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
  };

  useEffect(() => {
    checkAdminPermissions();
    // eslint-disable-next-line
  }, []);

  const paths = [
    { name: "Access Key Control", URL: "/admin/Webhook/AccessKey" },
    { name: "Errors Control", URL: "/admin/Webhook/Errors" },
    { name: "Events Control", URL: "/admin/Webhook/Events" },
    { name: "Teams Control", URL: "/admin/Webhook/Teams" },
  ];
  return (
    <>
      <SecondHeader paths={paths} darkMode={darkMode} position="true" />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/admin/Webhook/AccessKey">
              <AccessKeyControl darkMode={darkMode} />
            </Route>
            <Route exact path="/admin/Webhook/Errors">
              <ErrorControl darkMode={darkMode} />
            </Route>
            <Route exact path="/admin/Webhook/Events">
              <EventsControl darkMode={darkMode} />
              {/* <div>hello Events</div> */}
            </Route>
            <Route exact path="/admin/Webhook/Teams">
              <TeamsControl darkMode={darkMode} />
              {/* <div>hello Teams</div> */}
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default Index;
