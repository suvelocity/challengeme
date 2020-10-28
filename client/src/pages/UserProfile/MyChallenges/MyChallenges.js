import React from "react";
import { Link } from "react-router-dom";

const UserProfileLanding = () => {

    return (
        <div style={{ paddingTop: '200px' }} >
            <h1>This is challenges page</h1>
            <Link to='/profile' >
                myprofile
            </Link>
        </div>
    );
};

export default UserProfileLanding;