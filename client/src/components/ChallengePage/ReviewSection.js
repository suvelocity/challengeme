import React from "react";
import Review from "./Review.js";

function ReviewSection() {
	// TODO : fetch all the reviews of current challenge : GET /api/v1/challenge/:challengeId/review
	// TODO : fetch all the reviews of current challenge : POST /api/v1/challenge/:challengeId/review
	// TODO : fetch all the reviews of current challenge : PUT /api/v1/challenge/:challengeId/review
	// TODO : fetch all the reviews of current challenge : DELETE /api/v1/challenge/:challengeId/review

	return (
		<div>
			{/* render all the review with map */}
			{/* TODO: create a review Componenet thats */}
			<Review />
			{/* Create a component that contain new Review Form */}
		</div>
	);
}

export default ReviewSection;
