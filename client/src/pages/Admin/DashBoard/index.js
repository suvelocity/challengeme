import React, { lazy } from "react";
import "./style.css";
const SuccessSubmissionsPerUsers = lazy(() => import("./Charts/SuccessSubmissionsPerUsers"));
const LastWeekSubmissions = lazy(() => import("./Charts/LastWeekSubmissions"));
const SuccessPerChallenge = lazy(() => import("./Charts/SuccessPerChallenge"));
const TotalSubmission = lazy(() => import("./Charts/TotalSubmission"));

function DashBoard() {
  return (
    <div className="generic-page">
      <h1 className="dashboard-title-page">This DashBoard Admin Page</h1>
      <div className="dashboard-flexbox">
        <div className="paper-dashboard-chart">
          <TotalSubmission />
        </div>
        <div className="paper-dashboard-chart">
          <SuccessPerChallenge />
        </div>
        <div className="paper-dashboard-chart">
          <SuccessSubmissionsPerUsers />
        </div>

        <div className="paper-dashboard-chart">
          <LastWeekSubmissions />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
