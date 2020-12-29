import React, { useState, useEffect, useCallback } from 'react';
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Loading from '../../../../components/Loading';
import network from '../../../../services/network';
import '../style.css';

function SuccessPerChallenge() {
  const [challenges, setChallenges] = useState();

  const getChallengesByMostSuccess = useCallback(async () => {
    try {
      const { data: challengesMostSuccess } = await network.get(
        '/api/v1/insights/admin/success-challenge/',
      );
      setChallenges(challengesMostSuccess);
    } catch (error) { }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getChallengesByMostSuccess();
    // eslint-disable-next-line
  }, []);

  return challenges ? (
    <div className="last-week-submissions-chart">
      <h2 className="dashboard-title-chart">Challenges Most Success Submissions</h2>
      <ComposedChart
        layout="vertical"
        width={600}
        height={400}
        data={challenges}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="challengeSuccesses" barSize={20} fill="#005FAC" />
      </ComposedChart>
    </div>
  ) : (
      <Loading />
    );
}
export default SuccessPerChallenge;
