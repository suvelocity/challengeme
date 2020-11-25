import React, { useState, useEffect } from 'react';
import Loading from '../../../../../components/Loading';
import network from '../../../../../services/network';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

function TeamTotalSubmission({ darkMode }) {

    const { id } = useParams();
    const [teamSubmissions, setTeamSubmissions] = useState({});
    const [challengesOption, setChallengesOption] = useState();
    const [chosenChallenges, setChosenChallenges] = useState('assignments');


    const getDataOnTeam = async () => {
        try {
            const { data: submissions } = await network.get(`/api/v1/insights/teacher/team-submissions/${id}?challenge=${chosenChallenges}`);
            setTeamSubmissions(submissions)
        } catch (error) {
            console.error(error);
        }
    }

    const chooseChallenge = (event) => {
        setChosenChallenges(event.target.value);
    }

    const getAllChallengesForOption = async () => {
        const { data: allChallengesFromServer } = await network.get('/api/v1/challenges/');
        const challengesOptions = allChallengesFromServer.map((challenge) => {
            return <option onClick={() => { chooseChallenge(challenge.id) }} value={challenge.id}>{challenge.name}</option>
        })
        challengesOptions.unshift(<option onClick={() => { chooseChallenge('assignments') }} value='assignments'>Team Assignments</option>)
        setChallengesOption(challengesOptions);
    }


    useEffect(() => {
        getDataOnTeam();
        // eslint-disable-next-line
    }, [chosenChallenges,id]);

    useEffect(() => {
        getAllChallengesForOption();
        // eslint-disable-next-line
    }, [id]);

    const data = [
        { name: 'success', value: teamSubmissions.success },
        { name: 'fail', value: teamSubmissions.fail },
        { name: 'not yet', value: teamSubmissions.notYet },
    ];



    const COLORS = ['#00C49F', '#FF8042', '#0088FE'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
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
    };



    return (
        teamSubmissions ?
            (<div className="success-chart">
                <h2>Teams Total Submissions</h2>
                {challengesOption &&
                    <select onClick={chooseChallenge} >
                        {challengesOption}
                    </select>
                }
                <br />
                {data[0].value ? <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }

                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
                    :
                <h2>You haven't Assign Any Assignments Yet</h2>    
            }

            </div>
            ) : <Loading darkMode={darkMode} />
    );
}

export default TeamTotalSubmission;