import React, { lazy , useEffect} from "react";
import Cookies from 'js-cookie';
import mixpanel from 'mixpanel-browser';
import "./style.css";
const SuccessSubmissionsPerUsers = lazy(() => import("./Charts/SuccessSubmissionsPerUsers"));
const LastWeekSubmissions = lazy(() => import("./Charts/LastWeekSubmissions"));
const SuccessPerChallenge = lazy(() => import("./Charts/SuccessPerChallenge"));
const TeamTotalSubmission = lazy(() => import("./Charts/TeamTotalSubmission"));
const TopSuccessUsers = lazy(() => import("./Charts/TopSuccessUsers"));

function DashBoard({  teamName }) {

  useEffect(() => {
    const user = Cookies.get('userName');
    mixpanel.track('User On Team Dashboard Teacher Area', { User: `${user}`, Team: teamName });
  }, [teamName])

  return (
    <div className="generic-page">
      <h1 className="dashboard-title-page">
        {" "}
        Team: <span className="dashboard-title-page-name">{teamName}</span>{" "}
      </h1>
      <div className="dashboard-flexbox">
        <div className="paper-dashboard-chart">
          <TeamTotalSubmission />
        </div>
        <div className="paper-dashboard-chart">
          <SuccessPerChallenge />
        </div>
        <div className="paper-dashboard-chart">
          <SuccessSubmissionsPerUsers  />
        </div>
        <div className="paper-dashboard-chart">
          <LastWeekSubmissions />
        </div>
        <div className="paper-dashboard-chart">
          <TopSuccessUsers />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
