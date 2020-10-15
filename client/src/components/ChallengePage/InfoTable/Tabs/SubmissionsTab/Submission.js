import React from "react";
import './Submission.css';
import Cookies from "js-cookie";


function Submission({bold, name, status, submittedAt, userName, solutionRepository}) {
     
    const cookieUserName = Cookies.get('userName');
    
    return bold ? (
        <div className="submission">
                <div id="name"><strong>{name}</strong></div>
                <div id="status"><strong>{status}</strong></div>
                <div id="submittedAt"><strong>{submittedAt}</strong></div>
        </div>
    ) :
    (
        <div className="submission">
             <div id="name">{name}</div>
             { cookieUserName ===  userName ? 
             <div id="status">
                <a href={`https://www.github.com/${solutionRepository}`} 
             alt="click to navigate to your solution">
                 {status}</a></div>:<div id="status">{status}</div>}  
             <div id="submittedAt">{submittedAt}</div> 
        </div>
    );
}

export default Submission;
