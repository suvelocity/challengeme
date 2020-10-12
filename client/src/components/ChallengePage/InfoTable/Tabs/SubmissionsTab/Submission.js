import React from "react";
// import './Submission.css';
import Cookies from "js-cookie";


function Submission({bold, name, status, submittedAt, solution, userId, solutionRepository}) {
    // TODO: get the user id from the cookies
     
    const cookieUserId = Cookies.get('userId');
    // TODO: conditionall render an a tag to the submission if the id match
    
    console.table({cookieUserId, userId})
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
             {cookieUserId===userId ? 
             <div id="status">
                <a href={`https://www.github.com/${solutionRepository}`} 
             alt="click to navigate to your solution">
                 {status}</a></div>:<div id="status">{status}</div>}  
             <div id="submittedAt">{submittedAt}</div> 
        </div>
    );
}

export default Submission;
