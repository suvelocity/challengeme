import React, { useState, useCallback } from 'react';
import { XGrid } from '@material-ui/x-grid';
import network from '../../../services/network';
import { events } from '../../../config/Events';
import '../../../styles/MixpanelDashBoard.css';
import { Button, Input } from '@material-ui/core';

export default function MixPanelDashBoard() {

    const [event, setEvent] = useState('User On Forgot Password Page 2')
    const [startDate, setStartDate] = useState('1588367153607')
    const [endDate, setEndDate] = useState('1614257485728')
    const [limit, setLimit] = useState(5)
    const [eventsData, setEventsData] = useState([{ id: 2 }])
    const fetchEvents = useCallback(async () => {
        const { data } = await network.get(`/api/v1/insights/mixpanel?from=${startDate}&to=${endDate}&event=${event}&limit=${limit}`);
        console.log(data);
        setEventsData(data)
        // eslint-disable-next-line
    }, [event, startDate, endDate, limit])

    const data = {
        columns: Object.keys(eventsData[0]).map(event => {
            return {
                field: event,
                headerName: event,
                width: 150
            }
        }),
        rows: [...eventsData],
    };
    console.log(data);

    return (
        <div className="Mixpanel-DashBoard-container">
            <XGrid
                {...data}
                loading={data.rows.length === 0}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
            <Input onChange={(event) => setLimit(event.target.value)} />
            <Button onClick={fetchEvents} >Click Me !</Button>
        </div>
    );
}
