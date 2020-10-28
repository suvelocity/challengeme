import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
import network from "../../../services/network";
import "./MyChallenges.css";
import Button from "@material-ui/core/Button";


const UserProfileLanding = () => {
    const [allMyChallenges, setAllMyChallenges] = useState([]);

    const getMyChallenges = async () => {
        const { data: allMyChallengesFromServer } = await network.get(
            "/api/v1/challenges/userChallenges"
        );
        setAllMyChallenges(allMyChallengesFromServer);
    };
    useEffect(() => {
        const username = Cookies.get('userName')
        mixpanel.track("User On My Challenges Page", { "User": `${username}` })
        getMyChallenges()
    }, [])

    return (
        <div className="user-profile-my-challenges">
            <div className="user-profile-my-challenges-container">
                <h1>This is challenges page</h1>
                {allMyChallenges &&
                    allMyChallenges.map((challenge) => {
                        return (
                            <div key={challenge.name + challenge.id}>
                                <h1>Name: {challenge.name}</h1>
                                <div>Id :{challenge.id}</div>
                                <div>Author :{challenge.Author.userName}</div>
                                <div>Author Id: {challenge.authorId}</div>
                                <div>
                                    Labels:{" "}
                                    {challenge.Labels ? (
                                        challenge.Labels.map((label) => {
                                            return <li key={label.name}>{label.name}</li>;
                                        })
                                    ) : (
                                        <h2>Labels Not Found</h2>
                                    )}
                                </div>
                                <div>Boiler Plate: {challenge.boilerPlate}</div>
                                <div>Repository Name: {challenge.repositoryName}</div>
                                <div>Description: {challenge.description}</div>
                                <div>State: {challenge.state}</div>
                                <div>Type: {challenge.type}</div>
                                <div>Created At: {challenge.createdAt}</div>
                                <div>Updated At: {challenge.updatedAt}</div>
                            </div>
                        );
                    })}
                
                <Link to="/profile">
                    <Button
                        // className={classes.userProfileBackToMyProfile}
                        style={{ minWidth: 150 }}
                        variant="contained"
                        color="default"
                    >
                        back to My Profile
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UserProfileLanding;
