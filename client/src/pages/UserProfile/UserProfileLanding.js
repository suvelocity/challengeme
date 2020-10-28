import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import network from "../../services/network";

const UserProfileLanding = () => {

    return (
        <div style={{ paddingTop: '200px' }} >
            <h1>This is User Area</h1>
            {/* <Link to='/admin/SubmissionsByChallenges' >
                SubmissionsByChallenges
            </Link>
            <br/>
            <Link to='/admin/SubmissionsByUsers' >
                SubmissionsByUsers
            </Link>
            <br/>
            <Link to='/admin/proposedChallenges' >
                proposedChallenges
            </Link> */}
        </div>
    );
};

export default UserProfileLanding;