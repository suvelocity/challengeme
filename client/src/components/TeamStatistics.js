import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TeamStatistics(id) {

    // states
    const [team, setTeam] = useState(null);
    
    //effect
    useEffect(() => getInfo(id), []);
    
    //functions
    const getInfo = async () => {
        const { data } = await axios.get(`/teams/${id}`);
        setTeam(data);
    };

    
    return (
        <div>
            
        </div>
    )
}

export default TeamStatistics