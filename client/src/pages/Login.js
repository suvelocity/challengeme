import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../services/network";
import { Logged } from "../context/LoggedInContext";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
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

import "../styles/Login.css";

const useStyles = makeStyles((theme) => ({
  userName: {
    marginTop: "80px",
    marginBottom: "20px",
    width: "320px",
  },
  password: {
    marginBottom: "5px",
    width: "320px",
  },
  loginButton: {
    marginBottom: "10px",
    marginTop: "60px",
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
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const loginFunc = async (e) => {
        const formErrors = {};
        e.preventDefault();
        if (/\W/.test(userName)) {
            formErrors.userName = "invalid userName";
        }
        if (userName.length < 6 || userName.length > 32) {
            formErrors.userName = "userName must be 6-32 characters long";
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
            const { data: response } = await axios.post("/api/v1/auth/login", {
                userName: userName,
                password: password,
                rememberMe: rememberMe
            })
            value.setLogged(true);
            location.push("/");
        } catch (e) {
            setError({ msg: e.response.data.message })
        }
    };

    return (
        <div className="loginGeneral">
            <div className="containerHeader">
                <div className="loginHeader">
                    <div className="loginTitle">Log in</div>
                    <div className="orLoginWith">Or login with :</div>
                    <div>
                        <IconButton>
                            <FacebookIcon style={{ color: "white" }} />
                        </IconButton>
                        <IconButton>
                            <GitHubIcon style={{ color: "white" }} />
                        </IconButton>
                    </div>
                </div>
              </div>
            )}
            <Button
              type="submit"
              id="login-button"
              className={classes.loginButton}
            >
              Log in
            </Button>
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
            <div>
              <span>don't have an account yet?</span>
              <Link to="/register">Sign up</Link>
            </div>
            <div className="containerBody">
                <form className="loginForm" onSubmit={loginFunc}>
                    <div className="loginBody">
                        <FormControl className={classes.userName}>
                            <InputLabel
                                style={{ color: "grey" }}
                                htmlFor="standard-adornment-password"
                            >
                                User Name
                            </InputLabel>
                            <Input
                                type="text"
                                id="userNameField"
                                name="userName"
                                // color="secondary"
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
                        <FormControl className={classes.password}>
                            <InputLabel
                                style={{ color: "grey" }}
                                className={classes.labelPass}
                                htmlFor="standard-adornment-password"
                            >
                                Password
                            </InputLabel>
                            <Input
                                id="passwordField"
                                name="password"
                                value={password}
                                required
                                type={showPassword ? "text" : "password"}
                                onChange={updateField}
                                // color="secondary"
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
                        <Link to="/forgotpassword" className="forgotLabel">
                            Forgot Password ?
                        </Link>
                        {(error.userName || error.password || error.msg) && (
                            <div className="containerError">
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
                        <div>
                            <span>don't have an account yet?</span>
                            <Link to="/register" id='signUp'>Sign up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
