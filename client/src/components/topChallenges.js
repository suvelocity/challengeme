import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Charts from './charts';


function TopChallenges() {

    //states
    const [TopChallenges, setTopChallenges] = useState(null)

    // functions
    const getInfo = async () => {
        const { data } = await axios.get('/api/v1/statistics/insights/top-challenges');
        setTopChallenges(data);
    }

    const chartLabels = (challengesArr) => {
        const labels = [];
        for (let i = 0; i <challengesArr.length; i++) {
            labels.push(i);
        }
    }

    useEffect(() => getInfo(), []);

    const chartData = {
        labels: chartLabels(), // array of values for x axis (strings)
        title: 'Top Challenges', // title for the chart
        rawData: [
          {
            label: 'data1',// name of the line (one or two words)
            backgroundColor: 'red',//raw color
            borderColor: 'red',//use the same as background color
            fill: false, // change the line chart
            data: [65, 59, 80, 81, 56], // array of values for Y axis (numbers)
          }
        ]
    }


    return (
        <div className="topChallenges">
            <Charts chart={0,1,2} data={chartData}/>
        </div>
    )
}

export default TopChallenges