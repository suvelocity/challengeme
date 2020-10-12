import React from 'react';
import Rating from '@material-ui/lab/Rating';
import './Review.css';

function Review({ author, createdAt, title, content, rating }) {
  return (
    <div className='review'>
      <div className='title'>{title}</div>
      <div className='createdAt'>{createdAt.split('T')[0]}</div>
      <div className='content'>{content}</div>
      <div className='rating'>
        <Rating
          name='half-rating-read'
          defaultValue={rating}
          precision={0.5}
          readOnly
        />
      </div>
      <div className='author'>By: {author}</div>
    </div>
  );
}

export default Review;