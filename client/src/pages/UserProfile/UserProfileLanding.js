import React from "react";
import { Link } from "react-router-dom";
// import network from "../../services/network";

const UserProfileLanding = () => {

    return (
        <div style={{ paddingTop: '200px' }} >
            <h1>This is User Area</h1>
            <Link to='/profile/mychallenges' >
                mychallenges
            </Link>
            <br />
            <Link to='/profile/info' >
                info
            </Link>
        </div>
    );
};

export default UserProfileLanding;