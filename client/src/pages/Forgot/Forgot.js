import React, { useState } from "react";
import Security from "./Security";
import Change from "./Change";
import Identify from "./Identify";
import axios from "../../services/network";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import { motion } from "framer-motion";
import Background from "../../components/Background";
import Swal from "sweetalert2";
import "../../styles/Forgot.css";

const useStyles = makeStyles((theme) => ({
    nextButtonForgotPass: {
        marginBottom: "10px",
        background: "linear-gradient(45deg, #447CC6 30%, #315CAB 90%)",
        color: "white",
    },
}));
export default function Forgot() {
    const classes = useStyles();
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [secQuestion, setSecQuestion] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [secAnswer, setSecAnswer] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useHistory();

    const handleChange = (field) => (e) => {
        switch (field) {
            case "userName":
                setUserName(e.target.value);
                break;
            case "answer":
                setSecAnswer(e.target.value);
                break;
            case "newP":
                setPassword(e.target.value);
                break;
            case "confirmP":
                setConfirmPassword(e.target.value);
                break;
        }
    };

    const nextStep = () => {
        setError("");
        switch (step) {
            case 1:
                getQuestion(userName);
                break;
            case 2:
                validateAnswer(userName, secAnswer);
                break;
            case 3:
                resetPassword(password, confirmPassword, resetToken);
                break;
        }
    };

    const getQuestion = async (userName) => {
        if (
            userName.length < 1 ||
            userName.length > 32 ||
            /\W/.test(userName)
        ) {
            setError("Please enter a valid username");
            return;
        }
        try {
            const { data: response } = await axios.post(
                "/api/v1/auth/getquestion",
                {
                    userName,
                }
            );
            setSecQuestion(response.securityQuestion);
            setStep(2);
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    const validateAnswer = async (userName, securityAnswer) => {
        if (!securityAnswer) {
            setError("Please type your anwer");
            return;
        }
        if (securityAnswer.length < 8) {
            setError("Answer should be longer");
            return;
        }
        if (securityAnswer.match(/[^a-zA-Z\d\s]/)) {
            setError("Answer can not contain special characters");
            return;
        }
        try {
            const { data: response } = await axios.post(
                "/api/v1/auth/validateanswer",
                {
                    userName,
                    securityAnswer,
                }
            );
            setResetToken(response.resetToken);
            setStep(3);
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    const resetPassword = async (password, confirmPassword, resetToken) => {
        if (password.length < 8) {
            setError("password should be at least 8 characters");
            return;
        }
        if (password !== confirmPassword) {
            setError("passwords do not match");
            return;
        }
        try {
            const { data: response } = await axios.patch(
                "/api/v1/auth/passwordupdate",
                {
                    password,
                    resetToken,
                }
            );
            Swal.fire({
                icon: "success",
                text: response.message,
            }).then(() => {
                history.push("/login");
            });
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    const multiForm = () => {
        switch (step) {
            case 1:
                return (
                    <Identify data={{ userName }} handleChange={handleChange} />
                );
            case 2:
                return (
                    <Security
                        data={{ secQuestion, secAnswer }}
                        handleChange={handleChange}
                    />
                );
            case 3:
                return (
                    <Change
                        data={{ password, confirmPassword }}
                        handleChange={handleChange}
                    />
                );
        }
    };

    return (
        <>
            <Background />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    default: { duration: 0.5 },
                }}
                className="forgotPassGeneral"
            >
                <div className="containerHeaderForgotPass">
                    <div className="forgotPassHeader">
                        <div className="forgotPassTitle">
                            <b>Forgot Password</b>
                        </div>
                    </div>
                </div>
                <div className="ForgotPassBody">
                    {multiForm()}
                    {error !== "" && (
                        <motion.div className="containerErrorForgotPass">
                            <ErrorIcon
                                style={{
                                    color: "white",
                                    marginLeft: "4px",
                                }}
                            />
                            <div className="errorInputForgotPass">{error}</div>
                        </motion.div>
                    )}
                    <div className="containerButtonsForgotPass">
                        <Button
                            id='nextButton'
                            className={classes.nextButtonForgotPass}
                            variant="contained"
                            onClick={nextStep}
                        >
                            next
                        </Button>
                        <Link to="/login">Login Here</Link>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
