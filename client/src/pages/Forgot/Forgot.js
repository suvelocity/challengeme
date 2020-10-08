import React, { useState } from "react";
import Security from "./Security";
import Change from "./Change";
import Identify from "./Identify";
import axios from "../../services/network";
import { useHistory } from "react-router-dom";

export default function Forgot() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const history = useHistory();

  const nextStep = () => {
    switch (step) {
      case 1:
        getQuestion(data.userName);
      case 2:
        validateAnswer(data.userName, data.securityAnswer);
      case 3:
        resetPassword(data.newPassword, data.confirmPassword, data.resetToken);
    }
  };
  const prevStep = () => {
    if (step === 1) return;
    setStep((prevStep) => prevStep - 1);
  };

  const getQuestion = async (userName) => {
    try {
      const { data: response } = await axios.post("/api/v1/auth/getquestion", {
        userName,
      });
      setData((prev) => {
        prev.securityQuestion = response.securityQuestion;
        return prev;
      });
      setStep(2);
    } catch (e) {
      console.log(e.response.data);
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
      setData((prev) => {
        prev.resetToken = response.resetToken;
        return prev;
      });
      setStep(3);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const resetPassword = async (password, confirmPassword, token) => {
    if (password !== confirmPassword) {
      setError("passwords do not match");
      return;
    }
    try {
      const { data: response } = await axios.post(
        "/api/v1/auth/passwordupdate",
        {
          password,
          token,
        }
      );

      alert(response.message);
      history.push("/login");
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  // const handleChange = input => e => {
  //     switch (input) {
  //         case 'newPassword':
  //             setNew(e.target.value);
  //             break;
  //         case 'answer':
  //             setAnswer(e.target.value)
  //             break;
  //         case 'securityQuestion':
  //             setQuestion(e.target.value);
  //             break;
  //     }
  // }

  const multiForm = () => {
    switch (step) {
      case 1:
        return <Identify data={data} setData={setData} />;
      case 2:
        return (
          //   <Security
          //     securityAnswer={securityAnswer}
          //     securityQuestion={securityQuestion}
          //     nextStep={nextStep}
          //     prevStep={prevStep}
          //     handleChange={handleChange}
          //   />
          <Security data={data} setData={setData} />
        );
      case 3:
        return <Change data={data} setData={setData} />;
    }
  };
  console.log(data);
  console.log(error);
  return (
    <>
      <div>{multiForm()}</div>
      <button onClick={nextStep}>next</button>
      <button onClick={prevStep}>back</button>
      <div name="error-vox">{error}</div>
    </>
  );
}
