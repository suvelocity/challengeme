import React from 'react';
import {
  Tooltip, Legend, BarChart, Bar, CartesianGrid, XAxis, YAxis,
} from 'recharts';

function SuccessSubmissions({ members }) {
  return (
    <div className="success-chart">
      <h2>Teams Success Submissions</h2>
      <BarChart
        width={730}
        height={250}
        data={members.map((user) => ({ username: user.username, success: user.Submissions[0].userSuccessSubmission }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="userName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="success" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default SuccessSubmissions;
