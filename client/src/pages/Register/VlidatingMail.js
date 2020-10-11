import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import network from "../../services/network";

function ValidatingMail() {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);
  const token = query.get("token");
  useEffect(() => {
    network
      .post("/api/v1/auth/createuser", { token })
      .then((res) => history.push("/login"))
      .catch((err) => {
        alert("Email Confirmation Failed!");
        history.push("/login");
      });
  }, []);

  return <div></div>;
}

export default ValidatingMail;
