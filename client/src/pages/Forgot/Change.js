import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Timer from "./TImer";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockIcon from "@material-ui/icons/Lock";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
const useStyles = makeStyles((theme) => ({
    ForogotPassNewPass: {
        marginTop: "80px",
        marginBottom: "10px",
        width: "320px",
    },
    password: {
        // marginTop: "60px",
        marginBottom: "10px",
        width: "320px",
    },
    confirmPassword: {
        // marginTop: "80px",
        marginBottom: "30px",
        width: "320px",
    },
    answer: {
        // marginTop: "80px",
        // marginBottom: "20px",
        width: "320px",
    },
}));
export default function Change({ data, handleChange }) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [redirect, setRedirect] = useState(false);
    const limit = 5;
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            alert("Sorry, time is up");
            setRedirect(true);
        }, limit * 60 * 1000);
    });
    return redirect ? (
        <Redirect to="/" />
    ) : (
        <div className={classes.ForogotPassNewPass}>
            Attention! You have {<Timer limit={limit} unit={"minutes"} />} to
            change your password.
            <br />
            Enter new password :
            <FormControl className={classes.password}>
                <InputLabel
                    style={{ color: "grey" }}
                    className={classes.labelPass}
                    htmlFor="standard-adornment-password"
                >
                    Password
                </InputLabel>
                <Input
                    name="newP"
                    value={data.password}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange("newP")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                style={{ opacity: "0.7" }}
                                aria-label="toggle password visibility"
                                onMouseDown={handleClickShowPassword}
                                onMouseUp={handleClickShowPassword}
                            >
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                            <LockIcon style={{ opacity: "0.7" }} />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={classes.confirmPassword}>
                <InputLabel
                    style={{ color: "grey" }}
                    className={classes.labelPass}
                    htmlFor="standard-adornment-password"
                >
                    Confirm Password
                </InputLabel>
                <Input
                    name="confirmP"
                    value={data.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange("confirmP")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                style={{ opacity: "0.7" }}
                                aria-label="toggle password visibility"
                                onMouseDown={handleClickShowConfirmPassword}
                                onMouseUp={handleClickShowConfirmPassword}
                            >
                                {showConfirmPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                            <LockIcon style={{ opacity: "0.7" }} />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}
