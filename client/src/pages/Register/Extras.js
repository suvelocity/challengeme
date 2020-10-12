import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
    reason: {
        marginTop: "130px",
        marginBottom: "30px",
        width: "320px",
    },
    github: {
        // marginTop: "80px",
        // marginBottom: "20px",
        width: "320px",
    },
}));
function Extras({ values, handleChange }) {
    const classes = useStyles();

    return (
        <div className="containerExtra">
            <Select
            id="signUpReason"
            className={classes.reason}
                displayEmpty
                value={values.signUpReason}
                onChange={handleChange("signUpReason")}
            >
                <MenuItem value="" disabled>
                    Choose your sign-up reason...
                </MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Challenge Myself">Challenge Myself</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </Select>

            <FormControl className={classes.github}>
                <InputLabel style={{ color: "grey" }}>Enter your GitHub Account Username</InputLabel>
                <Input
                id="github"
                    type="text"
                    value={values.gitHub}
                    required
                    onChange={handleChange("gitHub")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <GitHubIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}

export default Extras;
