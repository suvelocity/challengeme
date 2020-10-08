import React from "react";

function Review({ author, createdAt, title, content, rating }) {
	return (
		<div>
			<div>
			<span id = "title">{title}</span>
			<span id = "createdAt">{createdAt}</span>
			</div>
			<div id = "content">{content}</div>
			<div>
			<span id = "rating">{rating}</span>
			<span id = "author">By: {author}</span>
			</div>
		</div>
	);
}

export default Review;
