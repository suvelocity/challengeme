import React, { useState } from "react";
import SubmitModal from "./SubmitModal";
// import ChallengePage from "./ChallengePage";
import SubmissionTable from "./SubmissionTable";

// const challenge = {
// 	cover: 'https://storage.googleapis.com/challenges-cover/tvv_f.png',
// 	createdAt: "2020-10-04T12:00:00.000Z",
// 	deletedAt: null,
// 	description: "tomer: https://github.com/suvelocity/TV-shows-boilerplate",
// 	id: 4,
// 	name: "React - Tv shows",
// 	repositoryName: "suvelocity/TV-shows-challenge",
// 	type: "client",
// 	updatedAt: "2020-10-04T12:00:00.000Z",
// 	createdBy:'user231',
// 	label:['React','JS','Promise'],
// 	rating: 3.7,
// 	isSaved:true,
// 	}
// 	‏
// 	const challengeId = 3 ;  //Mock until we merge shahar
function ChallengePage() {
	// TODO : fetch the challenge on mount
	const [modalOpen, setModalOpen] = useState(false);

	function handleModalClose() {
		setModalOpen(false);
	}
	return (
		<div>
			{/* <h1>challenge name</h1> */}
			{/* <img /> */}
			{/* <p>challenge description</p> */}
			{/* <span>challenge creation date</span> */}
			{/* <span>challenge update date</span> */}
			{/* <span>challenge lables/labels? (tags)</span> */}
			{/* <a>github template link</a> */}
			{/* <button>Submit button (open modal)</button> */}
			<button onClick={() => setModalOpen(true)}>open modal</button>
			<SubmitModal isOpen={modalOpen} handleClose={handleModalClose} />
			<SubmissionTable />
			{/* <ReviewsSection /> */}
		</div>
	);
}

export default ChallengePage;
