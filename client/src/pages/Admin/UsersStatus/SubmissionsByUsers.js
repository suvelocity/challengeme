import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import network from "../../../services/network";

const SubmissionsByUsers = () => {

    async function fetchData() {
        const {data} = await network.get('/api/v1/statistics/insights/users-submissions')
        console.log(data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div style={{paddingTop: '200px'}} >
            <h1>This is SubmissionsByUsers page</h1>     
            <Link to='/admin' >
                admin router
            </Link>
        </div>
    );
};

export default SubmissionsByUsers;