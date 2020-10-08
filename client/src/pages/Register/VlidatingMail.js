import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import network from "../../services/network";


function ValidatingMail() {
    const History = useHistory();
    const [access, setAccess] = useState();
    const url = useLocation();
    const query = new URLSearchParams(url.search);
    const token = query.get("token");
    useEffect(() => {
            network.post("/api/v1/auth/createuser", { token })
                .then((res) => setAccess("good"))
                .catch(err => setAccess("bad"))
    }, []);

    useEffect(() => {
        if (access === "good") History.push("/login");
    }, [access]);

    return (
        <div>
            waiting for mail validation
            {access === "bad" ? (
                <span>
                    bad token, you have opned your mail in a diffrenet browser, then the
                    one you used to sign
                </span>
            ) : (
                    ""
                )}
        </div>
    );
}

export default ValidatingMail;
