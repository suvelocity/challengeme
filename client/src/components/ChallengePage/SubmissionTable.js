import React, {useEffect, useState} from "react";
import Submission from "./Submission";
import axios from "axios";


const data = [{name:"asd", status:"fdgfdg", submittedAt:"3434"},{name:"asd", status:"fdgfdg", submittedAt:"3434"}];

function SubmissionTable(props) {
	const [subArr, setSubArr] = useState([]);

	const getSubmissions = async () => {
		const submissions = await axios.get(`/api/v1/challenges/${props.challengeId}/submissions`).then((res) => res.data);
		// const submissions = data;
		setSubArr(submissions);
	}

	useEffect(() => {
		getSubmissions();
	}, []);

	return <div>
				<Submission className="headlines" 
				name = {"Name"} 
				status = {"Status"} 
				submittedAt = {"Submitted at"} 
				bold = {true}/>
				{subArr.map((item,i)=> 
						<Submission className="submission" key={i} 
						name = {item.name} 
						status = {item.status} 
						submittedAt = {item.submittedAt}
						bold = {false}/>)}
			</div>;
}

export default SubmissionTable;
