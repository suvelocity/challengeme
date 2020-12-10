import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  PieChart, Pie, Tooltip, Cell, Legend,
} from 'recharts';
import Loading from '../../../../../components/Loading';
import network from '../../../../../services/network';

function TeamTotalSubmission({ darkMode }) {
  const { id } = useParams();
  const [teamSubmissions, setTeamSubmissions] = useState();
  const [challengesOption, setChallengesOption] = useState();
  const [chosenChallenges, setChosenChallenges] = useState('');

  const getDataOnTeam = async (Challenges) => {
    try {
      const { data: submissions } = await network.get(`/api/v1/insights/teacher/team-submissions/${id}?challenge=${Challenges}`);
      setTeamSubmissions([
        { name: 'success', value: submissions.success },
        { name: 'fail', value: submissions.fail },
        { name: 'not yet', value: submissions.notYet },
      ])
    } catch (error) {
    }
  };

  const chooseChallenge = (event) => {
    setChosenChallenges(event.target.value);
  };

  const getAllChallengesForOption = async () => {
    const { data: allChallengesFromServer } = await network.get('/api/v1/challenges/');
    const challengesOptions = allChallengesFromServer.map((challenge) => <option onClick={() => { chooseChallenge(challenge.id); }} value={challenge.id}>{challenge.name}</option>);
    challengesOptions.unshift(<option onClick={() => { chooseChallenge('assignments'); }} value="assignments">Team Assignments</option>);
    setChallengesOption(challengesOptions);
  };

  useEffect(() => {
    getDataOnTeam(chosenChallenges);
    // eslint-disable-next-line
  }, [chosenChallenges, id]);

  useEffect(() => {
    getAllChallengesForOption();
    // eslint-disable-next-line
  }, [id]);


  useEffect(() => {
    setChosenChallenges('assignments')
  }, [])

  const COLORS = ['#00C49F', '#FF8042', '#005FAC'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    teamSubmissions
      ? (
        <div className="success-chart">
          <h2 className="dashboard-title-chart">Teams Total Submissions</h2>
          {challengesOption
            && (
              <select onClick={chooseChallenge}>
                {challengesOption}
              </select>
            )}
          <br />
          {teamSubmissions[0].value ? (
            <PieChart width={400} height={400}>
              <Pie
                data={teamSubmissions}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {
                  teamSubmissions.map((entry, index) => <Cell key={`cell-${index + entry}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )
            : chosenChallenges === 'assignments' ? <h2>You haven't Assign Any Assignments Yet</h2> : <h2>There is for submissions on this challenge</h2>}
        </div>
      ) : <Loading darkMode={darkMode} />
  );
}

export default TeamTotalSubmission;
