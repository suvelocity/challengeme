import React from "react";
import { Link } from "react-router-dom";
import "./UserProfileLanding.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    userProfileButton: {
        margin: "15px",
    },
}));
const UserProfileLanding = () => {
    const classes = useStyles();
    return (
        <div className="user-profile-landing">
            <h1>This is User Area</h1>
            <div className="buttons-user-profile-landing">
                <Link to="/profile/MyChallenges">
                    <Button
                        className={classes.userProfileButton}
                        style={{ minWidth: 150 }}
                        variant="contained"
                        color="default"
                    >
                        My Challenges
                    </Button>
                </Link>
                <Link to="/profile/info">
                    <Button
                        className={classes.infoButton}
                        style={{ minWidth: 150 }}
                        variant="contained"
                        color="default"
                    >
                        Info
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UserProfileLanding;
