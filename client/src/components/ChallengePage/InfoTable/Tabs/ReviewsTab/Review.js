import React from "react";
import Rating from "@material-ui/lab/Rating";
import './Review.css';


function Review({ author, createdAt, title, content, rating }) {
	return (
		<div class="review">
			<div id = "title">{title}</div>
			<div id = "createdAt">{createdAt.split("T")[0]}</div>
			<div id = "content">{content}</div>
			<div id="rating">
          		<Rating
            		name="half-rating-read"
            		defaultValue={rating}
            		precision={0.5}
            		readOnly/>
        </div>
			<div id = "author">By: {author}</div>
		</div>
	);
}

export default Review;
