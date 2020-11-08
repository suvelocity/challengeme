import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import mixpanel from "mixpanel-browser";
import Cookies from "js-cookie";
import Loading from '../../../components/Loading/Loading';
import network from '../../../services/network';
const useStyles = makeStyles(() => ({

}));
const TeacherArea = ({ teamId }) => {
    const classes = useStyles();
    const [teamMembers, setTeamMembers] = useState()
    const [loading, setLoading] = useState(true)
    const [, set] = useState()

    useEffect(() => {
        (async () => {
            try {
                const { data: topSuccessSubmissionsByUsers } = await network.get(`/api/v1/statistics/teams/top-user/${teamId}`)
                console.log(topSuccessSubmissionsByUsers);
            } catch (error) {
                console.error(error);
            }
        })()
        const user = Cookies.get("userName");
        mixpanel.track("User On Techer Area", { User: `${user}` });
        setLoading(false)
    }, []);

    return (
        !loading ?
            <div className="team-landing-page">
                <h1>This is Teacher Team Area</h1>
                <div className="buttons-team-landing-page">

                </div>
            </div>
            : <Loading />
    );
};

export default TeacherArea;
