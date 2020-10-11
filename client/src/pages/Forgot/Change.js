import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Timer from "./TImer";
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
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
    ForogotPassContainer: {
        marginTop: "90px",
        marginBottom: "10px",
        width: "320px",
    },
    ForogotPasspassword: {
        // marginTop: "60px",
        marginBottom: "10px",
        width: "320px",
    },
    ForogotPassconfirmPassword: {
        // marginTop: "80px",
        marginBottom: "30px",
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
        const timer = setTimeout(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sorry, time is up !",
            }).then(()=>{
                setRedirect(true);
            })
        }, limit * 60 * 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return redirect ? (
        <Redirect to="/" />
    ) : (
        <div className={classes.ForogotPassContainer}>
            <b> Attention!</b> You have{" "}
            {<Timer limit={limit} unit={"minutes"} />} to change your password.
            <br />
            Enter new password :
            <FormControl className={classes.ForogotPasspassword}>
                <InputLabel
                    style={{ color: "grey" }}
                    className={classes.labelPass}
                    htmlFor="standard-adornment-password"
                >
                    Password
                </InputLabel>
                <Input
                    id="newPassword"
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
            <FormControl className={classes.ForogotPassconfirmPassword}>
                <InputLabel
                    style={{ color: "grey" }}
                    className={classes.labelPass}
                    htmlFor="standard-adornment-password"
                >
                    Confirm Password
                </InputLabel>
                <Input
                    id='confirmNewPassword'
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
