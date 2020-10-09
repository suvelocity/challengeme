import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Timer from './TImer';

export default function Change({ data, handleChange }) {
  const [redirect,setRedirect] = useState(false);
  const limit = 5;

  const history = useHistory();
  useEffect(()=>{
    setTimeout(()=>{
      alert("Sorry, time is up");
      setRedirect(true);
    }, limit*60*1000)
  })
  return (
    redirect?<Redirect to="/"/>:
    <div>
      Attention! You have {<Timer limit={limit} unit={"minutes"}/>} to change your password.<br/>
      Enter new password{" "}
      <input
        type="password"
        name="newP"
        value={data.password}
        onChange={handleChange("newP")}
        placeholder="Enter New Password"
      />{" "}
      <br />
      Confirm your password{" "}
      <input
        type="password"
        name="confirmP"
        placeholder="Confirm Password"
        value={data.confirmPassword}
        onChange={handleChange("confirmP")}
      />
      <br />
    </div>
  );
}
