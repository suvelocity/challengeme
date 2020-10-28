import React from "react";
import { Link } from "react-router-dom";

const AdminLanding = () => {

    return (
        <div style={{ paddingTop: '200px' }} >
            <h1>This is Admin page</h1>
            <Link to='/admin/SubmissionsByChallenges' >
                SubmissionsByChallenges
            </Link>
            <br />
            <Link to='/admin/SubmissionsByUsers' >
                SubmissionsByUsers
            </Link>
            <br />
            <Link to='/admin/ProposedChallenges' >
                proposedChallenges
            </Link>
            <br />
            <Link to='/admin/UsersControl' >
                UsersControl
            </Link>
        </div>
    );
};

export default AdminLanding;