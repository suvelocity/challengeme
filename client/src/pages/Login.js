import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../services/network";
import { Logged } from "../context/LoggedInContext";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import PeopleIcon from "@material-ui/icons/People";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GitHubIcon from "@material-ui/icons/GitHub";
import ErrorIcon from "@material-ui/icons/Error";
import { motion } from "framer-motion";
import Background from "../components/Background";
import "../styles/Login.css";

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
        transition: { duration: 1.5 },
    },
    out: {
        opacity: 0,
        transition: { duration: 1.5 },
    },
};
const useStyles = makeStyles((theme) => ({
    userNameLoginInput: {
        marginTop: "110px",
        marginBottom: "20px",
        width: "320px",
    },
    passwordLoginINput: {
        marginBottom: "5px",
        width: "320px",
    },
    loginButton: {
        marginBottom: "10px",
        marginTop: "70px",
        background: "linear-gradient(45deg, #447CC6 30%, #315CAB 90%)",
        color: "white",
    },
}));

export default function Login() {
    const classes = useStyles();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const location = useHistory();

    const value = useContext(Logged);

    useEffect(() => {
        //Prevent special password eye bugs
        document.addEventListener('mouseup', () => { setShowPassword(false) });
        document.addEventListener('dragend', () => { setShowPassword(false) });

    }, [])

    const updateField = (e) => {
        switch (e.currentTarget.name) {
            case "password":
                setPassword(e.currentTarget.value);
                break;
            case "userName":
                setUsername(e.currentTarget.value);
                break;
            case "rememberMe":
                setRememberMe((prevState) => !prevState);
                break;
        }
    };

    const loginFunc = async (e) => {
        const formErrors = {};
        e.preventDefault();
        if (/\W/.test(userName)) {
            formErrors.userName = "invalid userName";
        }
        if (userName.length < 1 || userName.length > 32) {
            formErrors.userName = "userName must be 1-32 characters long";
        }

        if (password.length < 8) {
            formErrors.password = "password must be at least 8 characters long";
        }
        if (formErrors.password || formErrors.userName) {
            setError(formErrors);
            return;
        }
        //request to server
        try {
            await axios.post("/api/v1/auth/login", {
                userName: userName,
                password: password,
                rememberMe: rememberMe,
            });
            value.setLogged(true);
            location.push("/");
        } catch (e) {
            setError({ msg: e.response.data.message });
        }
    };

    return (
        <>
            <Background />
            <motion.div
                onMouseUp={
                    () => setShowPassword(false)
                }
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    default: { duration: 0.5 },
                }}
                className="loginGeneral"
            >
                <div className="containerHeaderLogin">
                    <div className="loginTitle">
                        <b>Log in</b>
                    </div>
                    <div className="orLoginWith">
                        Or login with :
                        <IconButton>
                            <GitHubIcon style={{ color: "white" }} />
                        </IconButton>
                    </div>
                </div>
                <div className="containerBodyLogin">
                    <form className="loginForm" onSubmit={loginFunc}>
                        <div className="loginBody">
                            <FormControl className={classes.userNameLoginInput}>
                                <InputLabel style={{ color: "grey" }}>
                                    User Name
                                </InputLabel>
                                <Input
                                    type="text"
                                    id="userNameField"
                                    name="userName"
                                    value={userName}
                                    required
                                    onChange={updateField}
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
                            <FormControl className={classes.passwordLoginINput}>
                                <InputLabel style={{ color: "grey" }}>
                                    Password
                                </InputLabel>
                                <Input
                                    id="passwordField"
                                    name="password"
                                    value={password}
                                    required
                                    type={showPassword ? "text" : "password"}
                                    onChange={updateField}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                id="reveal"
                                                style={{ opacity: "0.7" }}
                                                aria-label="toggle password visibility"
                                                onMouseDown={
                                                    () => setShowPassword(true)
                                                }
                                                onMouseUp={
                                                    () => setShowPassword(false)
                                                }
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                        <VisibilityOff />
                                                    )}
                                            </IconButton>
                                            <LockIcon
                                                style={{ opacity: "0.7" }}
                                            />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div className="RememberAndforgot">
                                <FormControlLabel
                                    htmlFor="rememberMe"
                                    value="start"
                                    control={<Checkbox color="primary" />}
                                    label="Remember me"
                                    labelPlacement="end"
                                    name="rememberMe"
                                    type="checkbox"
                                    onChange={updateField}
                                />
                                <Link to="/forgot" className="forgotLabel">
                                    Forgot Password ?
                                </Link>
                            </div>
                            {(error.userName ||
                                error.password ||
                                error.msg) && (
                                    <div className="containerErrorLogin">
                                        <ErrorIcon
                                            style={{
                                                color: "white",
                                                marginLeft: "4px",
                                            }}
                                        />
                                        <div className="errorInput">
                                            {error.userName ||
                                                error.password ||
                                                error.msg}
                                        </div>
                                    </div>
                                )}
                            <Button
                                type="submit"
                                id="loginButton"
                                className={classes.loginButton}
                            >
                                Log in
                            </Button>
                            <div>
                                <span>don't have an account yet? </span>
                                <Link to="/register" id="signUp">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
};
