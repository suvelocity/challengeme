import React, { useState, useEffect } from 'react';
import Loading from '../../../../components/Loading';
import network from '../../../../services/network';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function SuccessPerChallenge({ darkMode }) {

    const [challenges, setChallenges] = useState()

    const getChallengesByMostSuccess = async () => {
        try {
            const { data: challengesMostSuccess } = await network.get(`/api/v1/insights/admin/success-challenge/`);
            const formattedChallengesMostSuccess = challengesMostSuccess.map((challenge) => {
                return ({
                    name: challenge.Challenge.name,
                    challengeSuccesses: challenge.challengeSuccesses
                })
            })
            setChallenges(formattedChallengesMostSuccess)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getChallengesByMostSuccess();
        // eslint-disable-next-line
    }, [])

    return (
        challenges ?
            (<div className="last-week-submissions-chart">
                <h2>Challenges Most Success Submissions</h2>
                <ComposedChart
                    layout="vertical"
                    width={600}
                    height={400}
                    data={challenges}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="challengeSuccesses" barSize={20} fill="#413ea0" />
                </ComposedChart>
            </div>
            ) : <Loading darkMode={darkMode} />
    );
}
export default SuccessPerChallenge;
