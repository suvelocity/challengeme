import React, { useState, useEffect } from 'react';
import Loading from '../../../../components/Loading';
import network from '../../../../services/network';
import moment from 'moment';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function LastWeekSubmissions({ darkMode }) {

    const [lastWeekSubmissions, setLastWeekSubmissions] = useState()

    const getLastWeekSubmissions = async () => {
        try {
            const { data: submissions } = await network.get(`/api/v1/insights/admin/last-week-submissions`);
            const formattedSubmissions = submissions.map((submission) => {
                submission.createdAt = moment(submission.createdAt).fromNow()
                submission.createdAt = submission.createdAt.includes('hour') ? 'today' : submission.createdAt.includes('minutes') ? 'today' : submission.createdAt.includes('seconds') ? 'today' : submission.createdAt
                return submission
            })
            setLastWeekSubmissions(formattedSubmissions.reverse())
        } catch (error) {
            console.error(error);
        }
    }

    const CustomizedLabel = ({ x, y, stroke, value, }) => {
        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }

    const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
        );
    }

    useEffect(() => {
        getLastWeekSubmissions();
        // eslint-disable-next-line
    }, [])

    return (
        lastWeekSubmissions ?
            (<div className="last-week-submissions-chart">
                <h2>Last Week Submissions</h2>
                <LineChart
                    width={500}
                    height={300}
                    data={lastWeekSubmissions}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" height={60} tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="dateSubmissions" stroke="#8884d8" label={<CustomizedLabel />} />
                </LineChart>
            </div>
            ) : <Loading darkMode={darkMode} />
    );
}

export default LastWeekSubmissions