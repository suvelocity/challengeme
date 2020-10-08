import React, { useEffect, useState } from "react";
import { Modal, TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import axios from "axios";

function SubmitModal({ isOpen, handleClose, challengeId, userId }) {
	const { register, handleSubmit, watch, errors } = useForm();
	const [userRating, setUserRating] = useState(0);

	// const [repoName, setRepoName] = useState("");
	// const [reviewTitle, setReviewTitle] = useState("");
	// const [reviewContent, setReviewContent] = useState("");

	const submitForm = async data => {
		//make POST request
		// VIEW SUBMITTED SUCCESSFULLY/FAILED TO SUBMITT MESSAGE and close modal
		const formData = {
			...data,
			userId
		};
		try {
			const res = await axios.post(`/${challengeId}/apply`, formData);
			console.log(res);
		} catch (error) {
			console.error(error);
		}

		// data object looks like:
		// {
		//  commentContent: "the content of the comment"
		//  commentTitle: "title for the comment"
		//  rating: 4, -> can't be null
		//  repository: "drormaman/pokedex", -> can't be null
		//  userId: 3 -> can't be null
		// }

		console.log(formData);
	};

	// console.log(watch("repository"));

	const isRepoExist = async repo => {
		const response = await fetch(`https://api.github.com/repos/${repo}`);
		return response.status !== 404;
	};
	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			style={{ width: 400, margin: "20px auto" }}>
			<form
				onSubmit={handleSubmit(submitForm)}
				style={{
					backgroundColor: "white",
					height: "60vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start"
				}}>
				<h3>submit your solution</h3>
				<label htmlFor="repoInput">Solution repository:</label>
				{/* <TextField */}
				{/* label="Solution repository" */}
				<input
					type="text"
					id="repoInput"
					name="repository"
					placeholder="Owner/Repo"
					ref={register({
						required: true,
						pattern: /^([^ ]+\/[^ ]+)$/,
						validate: { isRepoExist }
					})}
				/>
				{errors.repository && errors.repository.type === "required" && (
					<p>this </p>
				)}
				<label htmlFor="rating">Rating </label>
				{/*  this input is invisible, only here for the rating to work in the form */}
				<input
					name="rating"
					type="number"
					value={userRating}
					ref={register({ required: true })}
					hidden
					readOnly
				/>
				<Rating
					name="rating"
					value={userRating}
					// defaultValue={2.5}
					// precision={0.5}
					onChange={(_, value) => setUserRating(Number(value))}
				/>
				<label htmlFor="commentTitle">Title: </label>
				<input
					type="text"
					id="commentTitleInput"
					placeholder="Comment Title"
					name="commentTitle"
					ref={register({ maxLength: 100 })}
				/>
				<label htmlFor="reviewContentInput">Content: </label>
				<textarea
					type="text"
					id="reviewContentInput"
					name="commentContent"
					placeholder="Comment content"
					ref={register({ maxLength: 255 })}></textarea>
				<input type="submit" />
			</form>
		</Modal>
	);
}

export default SubmitModal;
