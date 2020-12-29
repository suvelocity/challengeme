import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  PieChart, Pie, Tooltip, Cell, Legend,
} from 'recharts';
import Loading from '../../../../components/Loading';
import network from '../../../../services/network';
import '../style.css';

const COLORS = ['#00C49F', '#FF8042', '#005FAC'];
const RADIAN = Math.PI / 180;

function TotalSubmission() {
  const { id } = useParams();
  const [totalSubmissions, setTotalSubmissions] = useState();
  const [challengesOption, setChallengesOption] = useState();
  const [chosenChallenges, setChosenChallenges] = useState('');

  const getDataOnUsers = useCallback(async (Challenges) => {
    try {
      const { data: submissions } = await network.get(`/api/v1/insights/admin/all-submissions?challenge=${Challenges}`);
      setTotalSubmissions([
        { name: 'success', value: submissions.success },
        { name: 'fail', value: submissions.fail },
        { name: 'not yet', value: submissions.notYet },
      ]);
    } catch (error) {
    }
    // eslint-disable-next-line
  }, [])

  const chooseChallenge = useCallback((event) => {
    setChosenChallenges(event.target.value);
    // eslint-disable-next-line
  }, [])

  const getAllChallengesForOption = useCallback(async () => {
    const { data: allChallengesFromServer } = await network.get('/api/v1/challenges/');
    const challengesOptions = allChallengesFromServer.map((challenge) => <option key={challenge.id} onClick={() => { chooseChallenge(challenge.id); }} value={challenge.id}>{challenge.name}</option>);
    challengesOptions.unshift(<option key="all" onClick={() => { chooseChallenge('all'); }} value="all">All Challenges</option>);
    setChallengesOption(challengesOptions);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getDataOnUsers(chosenChallenges);
    // eslint-disable-next-line
  }, [chosenChallenges, id]);

  useEffect(() => {
    getAllChallengesForOption();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setChosenChallenges('all');
    // eslint-disable-next-line
  }, []);

  const renderCustomizedLabel = useCallback(({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
    // eslint-disable-next-line
  }, [RADIAN])

  return (
    totalSubmissions
      ? (
        <div className="success-chart">
          <h2 className="dashboard-title-chart">Users Total Submissions</h2>
          {challengesOption
            && (
              <select onClick={chooseChallenge}>
                {challengesOption}
              </select>
            )}
          <br />
          {totalSubmissions[0].value ? (
            <PieChart width={400} height={400}>
              <Pie
                data={totalSubmissions}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {totalSubmissions.map((entry, index) => (
                  <Cell
                    key={`cell-${index + entry}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )
            : chosenChallenges === 'all' ? <h2>There is no submissions Yet</h2> : <h2>There is no submissions on this challenge</h2>}

        </div>
      ) : <Loading />
  );
}

export default TotalSubmission;
