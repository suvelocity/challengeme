import React, {useEffect, useState} from "react";
import Submission from "./Submission";
import network from "../../services/network"


// const data = [{name:"asd", status:"fdgfdg", submittedAt:"3434"},{name:"asd", status:"fdgfdg", submittedAt:"3434"}];

function SubmissionTable({challengeId}) {
	const [submissions, setSubmissions] = useState([]);

	
	useEffect(() => {
		const fetchSubmissions = async () => {
			const submissions = await network.get(`/api/v1/challenges/${challengeId}/submissions`).then((res) => res.data);
			setSubmissions(submissions);
		}
		fetchSubmissions();
		const liveSubmissions = setInterval(fetchSubmissions,7000)
		return () => clearInterval(liveSubmissions);
	}, [challengeId]);

	return <div>
				<Submission className="headlines" 
				name = {"Name"} 
				status = {"Status"} 
				submittedAt = {"Submitted at"} 
				bold = {true}/>
				{submissions.map((item,i)=> 
						<Submission className="submission" key={i} 
						name = {item.solutionRepository.split('/')[0]} 
						status = {item.state} 
						submittedAt = {item.updatedAt.split('T').join(' ').split('.')[0]}
						bold = {false}/>)}
						
			</div>;
}

export default SubmissionTable;
