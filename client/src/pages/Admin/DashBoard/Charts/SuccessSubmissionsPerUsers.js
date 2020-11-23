import React, { useState, useEffect } from 'react';
import Loading from '../../../../components/Loading';
import network from '../../../../services/network';
import {
  Tooltip, Legend, BarChart, Bar, CartesianGrid, XAxis, YAxis,
} from 'recharts';

function SuccessSubmissions({ darkMode }) {

  const [teamMembers, setTeamMembers] = useState();

  const getDataOnTeam = async () => {
    try {
      const { data: members } = await network.get(`/api/v1/insights/admin/top-user`);
      const fromattedMembers = members.map((member) => {
        const filteredSubmissions = []
        let success = 0
        let fail = 0
        member.Submissions.forEach((submission) => {
          if (filteredSubmissions.includes(submission.challengeId)) {
          } else {
            filteredSubmissions.push(submission.challengeId);
            if (submission.state === 'SUCCESS') {
              success++
            } else {
              fail++
            }
          }
        })
        return ({
          success,
          fail,
          userName: member.userName
        })
      })
      setTeamMembers(fromattedMembers)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataOnTeam();
    // eslint-disable-next-line
  }, []);

  return (
    teamMembers ?
      (<div className="success-chart">
        <h2>Teams Success Submissions</h2>
        <BarChart
          width={730}
          height={250}
          data={teamMembers}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userName" height={60} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="success" fill="#29bf12" />
          <Bar dataKey="fail" fill="#bf0603" />
        </BarChart>
      </div>
      ) : <Loading darkMode={darkMode} />
  );
}

export default SuccessSubmissions;
