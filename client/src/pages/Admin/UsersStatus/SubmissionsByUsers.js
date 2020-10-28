import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import network from "../../../services/network";
import Loading from "../../../components/Loading/Loading";

const SubmissionsByUsers = () => {
    const [data , setData] = useState([])

    async function fetchData() {
        const {data} = await network.get('/api/v1/statistics/insights/users-submissions')
        setData(data)
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
            {data.length > 0? data.map((user)=>{
                return(
                    <div key={user.userName}>
                        <h1>{user.userName}</h1>
                        {user.Submissions.map((submission)=>{
                            return (
                                <>
                                <h3>Challenge Name: {submission.Challenge.name}</h3>
                                <div>Status: {submission.state}</div>
                                <div>Created At: {submission.createdAt}</div>
                                </>
                            )
                        })}
                    </div>
                )
            }):<Loading/>}
        </div>
    );
};

export default SubmissionsByUsers;