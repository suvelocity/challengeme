import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";

function SubmitModal({ isOpen, handleClose, challengeId }) {
	const [repoName, setRepoName] = useState("");
	const [reviewTitle, setReviewTitle] = useState("");
	const [reviewContent, setReviewContent] = useState("");
	const [userRating, setUserRating] = useState(0);

	function submitForm() {
		//make POST request
		// VIEW SUBMITTED SUCCESSFULLY/FAILED TO SUBMITT MESSAGE and close modal
	}
	//
	function validateRepoName(repo) {
		setRepoName(repo);
	}
	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			style={{ width: 400, margin: "20px auto" }}>
			<div
				style={{
					backgroundColor: "white",
					height: "60vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start"
				}}>
				<h3>submit your solution</h3>

				<label for="repoInput">
					repo:
					<input
						type="text"
						id="repoInput"
						value={repoName}
						onChange={({ target }) => {
							validateRepoName(target.value);
						}}
						placeholder="Owner/repo"
						required
					/>
				</label>
				<select
					name="rating"
					id="rating"
					required
					onChange={({ target }) => setUserRating(target.value)}>
					<option value="" selected disabled>
						Enter Rating
					</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>

				<label for="commentTitle">
					title:
					<input
						type="text"
						id="commentTitleInput"
						placeholder="Comment Title"
						value={reviewTitle}
						max="100"
						onChange={({ target }) => setReviewTitle(target.value)}
					/>
				</label>
				<label for="reviewContentInput">
					content:
					<textarea
						type="text"
						id="reviewContentInput"
						max="255"
						placeholder="Comment content"
						onChange={({ target }) => setReviewContent(target.value)}>
						{reviewContent}
					</textarea>
				</label>
				<button onClick={submitForm}>Submit</button>

				{/* TODO: repo input */}
				{/* TODO : validate link from above input - correct input and existing repository */}
				{/* TODO: rating input 1-5 */}
				{/* TODO: review input title (up to 100 chars)*/}
				{/* TODO: review input content (up to 255 chars)*/}
				{/* TODO: cancel button */}
				{/* TODO: submit button */}
				{/* TODO: render a result with a waiting "checking your solution plaese wait : success/faliure" */}
				{/* NOT IN MODAL => SHOULD MOVED TO SUBMISSIONTABLE */}
			</div>
		</Modal>
	);
}

export default SubmitModal;
