import React, { useState } from "react";
import Security from "./Security";
import Change from "./Change";
import Identify from "./Identify";

export default function Forgot() {
  const [step, setStep] = useState(1);
  const [securityQuestion, setQuestion] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");

  const nextStep = () => {
    if (!securityQuestion) return;
    if (!securityAnswer) return;
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
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
        return <Identify setQuestion={setQuestion} nextStep={nextStep} />;
      case 2:
        return (
          <Security
            securityAnswer={securityAnswer}
            securityQuestion={securityQuestion}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <Change
            newPassword={newPassword}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
          />
        );
    }
  };

  return <div>{multiForm()}</div>;
}
