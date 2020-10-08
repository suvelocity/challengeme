import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import PeopleIcon from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
    firstName: {
        marginTop: "80px",
        // marginBottom: "20px",
        width: "320px",
    },
    lastName: {
        // marginTop: "80px",
        // marginBottom: "20px",
        width: "320px",
    },
    userName: {
        // marginTop: "80px",
        // marginBottom: "20px",
        width: "320px",
    },
    email: {
        // marginTop: "80px",
        // marginBottom: "20px",
        width: "320px",
    },
}));
function UserDetails({  handleChange, values }) {
    const classes = useStyles();

    return (
        <div className="containerUserDetails">
            <FormControl className={classes.firstName}>
                <InputLabel style={{ color: "grey" }}>First Name</InputLabel>
                <Input
                    type="text"
                    value={values.firstName}
                    required
                    onChange={handleChange("firstName")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <PeopleIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={classes.lastName}>
                <InputLabel style={{ color: "grey" }}>last Name</InputLabel>
                <Input
                    type="text"
                    value={values.lastName}
                    required
                    onChange={handleChange("lastName")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <PeopleIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={classes.userName}>
                <InputLabel style={{ color: "grey" }}>Username</InputLabel>
                <Input
                    type="text"
                    value={values.userName}
                    required
                    onChange={handleChange("userName")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <PeopleIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={classes.email}>
                <InputLabel style={{ color: "grey" }}>Email</InputLabel>
                <Input
                    type="email"
                    value={values.email}
                    required
                    onChange={handleChange("email")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <Email />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}

export default UserDetails;
