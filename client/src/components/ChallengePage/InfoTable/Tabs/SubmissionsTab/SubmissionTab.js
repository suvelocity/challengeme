import React, {useEffect, useState} from "react";
import network from '../../../../../services/network'
import Submission from './Submission'


// TODO: get the userName from the coockies and aloow him to see is own submissions


function SubmissionTab({challengeId}) {
	const [submissions, setSubmissions] = useState([]);

	
	useEffect(() => {
		const fetchSubmissions = async () => {
			const {data:submissions} = await network.get(`/api/v1/challenges/${challengeId}/submissions`)
			setSubmissions(submissions);
		}
		fetchSubmissions();
		const liveSubmissions = setInterval(fetchSubmissions,7000)
		return () => clearInterval(liveSubmissions);
	}, [challengeId]);
	console.log({submissions})
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

export default SubmissionTab;
