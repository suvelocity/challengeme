import React from 'react'
import { useEffect, useState } from 'react';
import Review from './Review';
import network from '../../../../../services/network';
const userId = 1;
const challengeId = 2 ;
function ReviewsTab({challengeId}) {
    // TODO: fetch interval all reviews
    // TODO: change the style with amit
    // TODO:insert a review with dror and expect to be here
    // TODO: user can delete his review, bonus , can edit it
    const [reviews,setReviews] = useState(null)
    useEffect(() => {
        const fetchReviews = async () => {
            const {data: reviewsArray } = await network.get(`/api/v1/reviews/byChallenge/${challengeId}`)
        const filteredReviews = reviewsArray.filter(review => review.content && review.title)
        setReviews(filteredReviews);
        }
        fetchReviews()
        const liveReviews = setInterval(fetchReviews,5000)
        return () => clearInterval(liveReviews)
    },[challengeId])
    return reviews ?  (
        reviews.map((review,index)=>{
                const { createdAt, title, content, rating,User:{userName} } = review;
                return  <Review
                author={userName}
                createdAt={createdAt} 
                title={title}
                content={content}
                rating={rating}
                solutionRepo={solutionRepo}
                />
            }))
            :(
            <h1>Loading....</h1>
            )
    
}

export default ReviewsTab;
