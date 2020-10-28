import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import network from "../../../services/network";
import Loading from "../../../components/Loading/Loading";


const SubmissionsByChallenges = () => {
    const [data, setData] = useState([])
    const [usersPerChallenge, setUsersPerChallenge] = useState([])

    const fetchData = async () => {
        const { data } = await network.get('/api/v1/statistics/insights/challenges-sumbissions')
   
        setData(data[0])
        setUsersPerChallenge(data[1])
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div style={{ paddingTop: '200px' }} >
            <h1>This is SubmissionsByChallenges page</h1>
            <Link to='/admin' >
                admin router
            </Link>
            {data.length > 0 ? data.map((challenge, index) => {
                return (
                    <div key={challenge.Challenge.name}>
                        <h1>{challenge.Challenge.name}</h1>
                        <div>Sumbissions Count: {challenge.countSub}</div>
                        <div>Created At: {challenge.createdAt}</div>
                        {
                            challenge.countSub > 0 ?
                                <div><h2>Users:</h2>{usersPerChallenge.length > 0 ? usersPerChallenge.map((userChallenge) => {
                                    if (challenge.Challenge.id === userChallenge.id) {
                                        return userChallenge.Submissions.map((userBySubmission) => {
                                            return (<div key={userBySubmission.id}>
                                                <h4>UserName: {userBySubmission.User.userName}</h4>
                                                <div>Submited At: {userBySubmission.createdAt}</div>
                                                <div>Status: {userBySubmission.state}</div>
                                            </div>)
                                        })
                                    } else {
                                        return <div></div>
                                    }
                                }) : <Loading />}</div>
                                : null
                        }
                    </div>
                )
            }) : <Loading />}
        </div>
    );
};

export default SubmissionsByChallenges;