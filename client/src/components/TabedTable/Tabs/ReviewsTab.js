import React, {useEffect, useState} from "react";
import Review from "./Review.js";
import axios from "axios";


// const data = [{author:"author", title:"title", createdAt:"date", content:"sadsadsadasdasd", rating:4}];

function ReviewsTab({challengeId}) {
	
	const [revArr, setRevArr] = useState([]);
	useEffect(() => {
		const getReviews = async () => {
			const reviews = await axios.get(`/api/v1/reviews/byChallenge/${challengeId}`).then((res) => res.data);
			const filteredRevs = reviews.filter(item => item.title !== undefined && item.content !== undefined);
			setRevArr(filteredRevs);
		}
	
		getReviews();
	}, [challengeId]);

	return (
		<div>
			{revArr.map((item,i)=> 
						<Review key={i} 
						author = {item.author} 
						createdAt = {item.createdAt} 
						title = {item.title}
						content = {item.content}
						rating = {item.rating}/>)}
		</div>
	);
}

export default ReviewsTab;
