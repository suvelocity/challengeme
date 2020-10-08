import React, {useEffect, useState} from "react";
import Submission from "./Submission";
import axios from "axios";

const data = [{name:"asd", status:"fdgfdg", submittedAt:"3434"}];

function SubmissionTable() {
	const [subArr, setSubArr] = useState([]);

	const getSubmissions = async () => {
		// const submissions = await axios.get(`/`).then((res) => res.data);
		const submissions = data;
		setSubArr(submissions);
	}

	useEffect(() => {
		getSubmissions();
	}, []);

	console.log(subArr);
	return <div>
				<table>
				<tr>
					<th>Name</th>
					<th>Status</th>
					<th>Submitted at</th>
				</tr>
				{subArr.map((item,i)=> 
						<Submission className="submission" key={i} name = {item.name} status = {item.status} submittedAt = {item.submittedAt}/>)}
				</table>
	</div>;
}

export default SubmissionTable;
