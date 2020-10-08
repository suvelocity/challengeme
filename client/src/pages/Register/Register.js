import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirm from "./Confirm";
import Security from "./Security";
import Extras from "./Extras";
import network from "../../services/network";
import Stepper from "./Stepper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import "../../styles/Register.css";

const useStyles = makeStyles((theme) => ({
    nextButton: {
        // marginBottom: "10px",
        // marginTop: "60px",
        background: "linear-gradient(45deg, #447CC6 30%, #315CAB 90%)",
        color: "white",
    },
}));

function Register() {
    const classes = useStyles();
    const [errors, setErrors] = useState([]);
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [signUpReason, setSignUpReason] = useState("");
    const [gitHub, setGitHub] = useState("");

    const nextStep = () => {
        const validateEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const onlyLettersRegex = /^[a-zA-Z]*$/;
        const onlyLettersAndNumbersRegex = /^[A-Za-z0-9]*$/;
        const onlyNumbersRegex = /^[0-9]*$/;

        let tempErrs = [];
        if (step === 1) {
            if (firstName.length < 1 || !onlyLettersRegex.test(firstName))
                tempErrs.push({
                    field: "firstName",
                    message: "First name must contain only letters.",
                });
            if (lastName.length < 1 || !onlyLettersRegex.test(lastName))
                tempErrs.push({
                    field: "lastName",
                    message: "Last name  must contain only letters.",
                });
            if (
                userName.length < 6 ||
                !onlyLettersAndNumbersRegex.test(userName)
            )
                tempErrs.push({
                    field: "userName",
                    message:
                        "Username must contain only letters and numbers and be longer then 6 characters.",
                });
            if (email.length < 1)
                tempErrs.push({ field: "email", message: "Email required." });
            if (!validateEmailRegex.test(email))
                tempErrs.push({ field: "email", message: "Email invalid." });
        } else if (step === 2) {
            if (country.length < 1 || !onlyLettersRegex.test(country))
                tempErrs.push({
                    field: "country",
                    message: "Country must contain only letters",
                });
            if (city.length < 1 || !onlyLettersRegex.test(city))
                tempErrs.push({
                    field: "city",
                    message: "City must contain only letters",
                });
            if (birthDate.length < 1)
                tempErrs.push({
                    field: "birthDate",
                    message: "Birth date required",
                });
            if (new Date(birthDate).valueOf() > new Date().valueOf())
                tempErrs.push({
                    field: "birthDate",
                    message: "Birth date must be in the past.",
                });
            if (phoneNumber.length < 1 || !onlyNumbersRegex.test(phoneNumber))
                tempErrs.push({
                    field: "phoneNumber",
                    message: "Only numbers allowed in phone number.",
                });
        } else if (step === 3) {
            if (password.length < 8)
                tempErrs.push({
                    field: "password",
                    message: "Password needs to be at least 8 characters.",
                });
            if (password !== confirmPassword)
                tempErrs.push({
                    field: "confirmPassword",
                    message: "Passwords must be identical.",
                });
            if (securityQuestion === "")
                tempErrs.push({
                    field: "securityQuestion",
                    message: "Security question must be chosen.",
                });
            if (securityAnswer.length < 2)
                tempErrs.push({
                    field: "securityAnswer",
                    message: "Security answer must be longer.",
                });
        } else if (step === 4) {
            if (signUpReason === "")
                tempErrs.push({
                    field: "signUpReason",
                    message: "Sign up reason must be chosen.",
                });
            if (gitHub.length < 1 || !onlyLettersAndNumbersRegex.test(gitHub))
                tempErrs.push({
                    field: "gitHub",
                    message: "GitHub account is invalid.",
                });
        }
        if (tempErrs.length === 0) {
            setStep(step + 1);
            setErrors([]);
        } else {
            setErrors(tempErrs);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        setErrors([]);
    };

    const handleSubmit = async () => {
        try {
            const { data: regRes } = await network.post(
                "/api/v1/auth/register",
                {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password,
                    birthDate,
                    country,
                    city,
                    phoneNumber,
                    githubAccount: gitHub,
                    reasonOfRegistration: signUpReason,
                    securityQuestion,
                    securityAnswer,
                }
            );
            if (regRes) {
                setStep(5)
            }
        } catch (err) {
            setErrors([...errors, { field: "server", message: err.message }]);
        }
    };

    const handleChange = (input) => (e) => {
        switch (input) {
            case "firstName":
                setFirstName(e.target.value);
                break;
            case "lastName":
                setLastName(e.target.value);
                break;
            case "userName":
                setUserName(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "confirmPassword":
                setConfirmPassword(e.target.value);
                break;
            case "birthDate":
                setBirthDate(e.target.value);
                break;
            case "country":
                setCountry(e.target.value);
                break;
            case "city":
                setCity(e.target.value);
                break;
            case "phoneNumber":
                setPhoneNumber(e.target.value);
                break;
            case "signUpReason":
                setSignUpReason(e.target.value);
                break;
            case "gitHub":
                setGitHub(e.target.value);
                break;
            case "securityQuestion":
                setSecurityQuestion(e.target.value);
                break;
            case "securityAnswer":
                setSecurityAnswer(e.target.value);
                break;
            default:
                break;
        }
    };

    const values = {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
        birthDate,
        country,
        city,
        phoneNumber,
        signUpReason,
        gitHub,
        securityQuestion,
        securityAnswer,
    };

    const multiForm = () => {
        switch (step) {
            case 1:
                return (
                    <UserDetails
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <PersonalDetails
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={values}
                    />
                );
            case 3:
                return <Security handleChange={handleChange} values={values} />;
            case 4:
                return <Extras handleChange={handleChange} values={values} />;
            // case 5:
            //     return <Confirm handleSubmit={handleSubmit} values={values} />;
            default:
                return (
                    <UserDetails
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                    />
                );
        }
    };

    return (
        <div className="registerGeneral">
            <div className="containerHeaderRegister">
                <div className="registerHeader">
                    <div className="registerTitle">Register</div>
                    <Stepper activeStep={step} />
                </div>
            </div>
            <div className="registerBody">
                {multiForm()}
                {errors.length !== 0 && (
                    <div className="containerErrorRegister">
                        <ErrorIcon
                            style={{
                                color: "white",
                                marginLeft: "4px",
                            }}
                        />
                        <div className="errorInputRegister">
                            {errors[0].message}
                        </div>
                    </div>
                )}
                <div className="containerSecond">
                    <div className="containerButtons">
                        {step > 1 && <Button onClick={prevStep}>Back</Button>}
                        <Button
                            className={classes.nextButton}
                            variant="contained"
                            color="primary"
                            onClick={step === 4 ? handleSubmit : nextStep}
                        >
                            {step === 4 ? "Finish" : "Next"}
                        </Button>
                    </div>

                    <p>
                        Have an existing account?{" "}
                        <Link to="/login">Login Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;

// /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
//   email,

// (/[^a-zA-Z -]/.test(fieldValue))