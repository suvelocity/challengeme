import React from 'react'
import Review from './Review'
const challengeId = 2 ;
function ReviewsTab({challengeId}) {
    // TODO: fetch interval all reviews
    // TODO: change the style with amit
    // TODO:insert a review with dror and expect to be here
    return (
        <div>
            <Review
            author="tsach"
            createdAt="2017-2-2" 
            title="title"
            content="lorempixelddas asbbxjasbxsajkbxkajs"
            rating={4}
            />
        </div>
    )
}

export default ReviewsTab
