import React from "react";
import './Submission.css';

function Submission({bold, name, status, submittedAt}) {
	return (
		<div className="submission">
            {bold ? <div id="name"><strong>{name}</strong></div> : <div id="name">{name}</div>}
            {bold ? <div id="status"><strong>{status}</strong></div> : <div id="status">{status}</div>}    
            {bold ? <div id="submittedAt"><strong>{submittedAt}</strong></div> : <div id="submittedAt">{submittedAt}</div>}        
        </div>
	);
}

export default Submission;
