import React, { useEffect, useState } from 'react';
import Review from './Review';
import network from '../../services/network';

function ReviewsTab({ challengeId, setRatingCount }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data: reviewsArrayFromServer } = await network.get(
          `/api/v1/reviews/${challengeId}`,
        );
        setRatingCount(reviewsArrayFromServer.length);
        const reviewsWithContent = reviewsArrayFromServer.filter(
          (review) => review.title && review.content,
        );
        setReviews(reviewsWithContent);
        setLoading(false);
      } catch (error) {
      }
    };
    setLoading(true)
    fetchReviews();
    const liveReviews = setInterval(fetchReviews, 5000);
    return () => clearInterval(liveReviews);
    // eslint-disable-next-line
  }, [challengeId]);

  return <>
    <h1 className='Reviews-H1'>Reviews:</h1>
    <ul className='Reviews-Container'>{!loading ? reviews.length>0? reviews.map((review) => {
      const { id, createdAt, title, content, rating, User: { userName }, } = review;
      return (
        <Review
          key={id}
          reviewId={id}
          author={userName}
          createdAt={createdAt}
          title={title}
          content={content}
          rating={rating}
        />
      )
    }):<div className="Review" style={{paddingTop:'40px'}}><h1>This challenge has no reviews yet</h1></div>:<div className="Review" style={{paddingTop:'40px'}}><h1>loading...</h1></div>}
    </ul>
  </>
}

export default ReviewsTab;
