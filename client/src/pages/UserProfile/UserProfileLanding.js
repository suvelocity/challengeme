import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';

const UserProfileLanding = () => {

    useEffect(() => {
        const user = Cookies.get('userName')
        mixpanel.track("User On Profile Area", { "User": `${user}` })
    }, [])

    return (
        <div style={{ paddingTop: '200px' }} >
            <h1>This is User Area</h1>
            <Link to='/profile/MyChallenges' >
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