import React, { useState } from "react";
import Security from "./Security";
import Change from "./Change";
import Identify from "./Identify";
import axios from "../../services/network";
import { useHistory } from "react-router-dom";

export default function Forgot() {
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
  const prevStep = () => {
    if (step === 1) return;
    setStep((prevStep) => prevStep - 1);
  };

  const getQuestion = async (userName) => {
    if(userName.length < 8 || userName.length > 32 ||/\W/.test(userName)) {
      setError("Please enter a valid username ");
      return;
    }
    try {
      const { data: response } = await axios.post("/api/v1/auth/getquestion", {
        userName,
      });
      console.log(response);
      setSecQuestion(response.securityQuestion);
      setStep(2);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const validateAnswer = async (userName, securityAnswer) => {
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

      alert(response.message);
      history.push("/login");
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const multiForm = () => {
    switch (step) {
      case 1:
        return <Identify data={{ userName }} handleChange={handleChange} />;
      case 2:
        return (
          //   <Security
          //     securityAnswer={securityAnswer}
          //     securityQuestion={securityQuestion}
          //     nextStep={nextStep}
          //     prevStep={prevStep}
          //     handleChange={handleChange}
          //   />
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
  console.log(error);
  return (
    <>
      <div>{multiForm()}</div>
      <button onClick={nextStep}>next</button>
      <button onClick={prevStep}>back</button>
      <div name="error-box">{error}</div>
    </>
  );
}
