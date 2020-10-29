import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import './Review.css';

function Review({
  author, createdAt, title, content, rating,
}) {
  const [date, setDate] = useState('');

  // TODO: POP: use moment instead
  useEffect(() => {
    const dateNow = Date.now();
    const updateRepoDate = new Date(createdAt);
    let diff = (dateNow - updateRepoDate.getTime()) / 1000 / 60 / 60;
    if (diff < 24) {
      setDate(`${Math.floor(diff)} Hours ago`);
    } else {
      diff /= 24;
      diff = Math.floor(diff);
      if (diff < 8) {
        setDate(`${Math.floor(diff)} Days ago`);
      } else {
        diff = Math.floor(diff / 7);
        if (diff < 5) {
          setDate(`${Math.floor(diff)} Weeks ago`);
        } else {
          diff = Math.floor(diff / 4);
          if (diff < 13) {
            setDate(`${Math.floor(diff)} Months ago`);
          } else {
            diff = Math.floor(diff / 12);
            setDate(`${Math.floor(diff)} Years ago`);
          }
        }
      }
    }
  }, [createdAt]);
  return (
    <div className="review">
      <div className="title">{title}</div>
      <div className="createdAt">{date}</div>
      <div className="content">{content}</div>
      <div className="rating">
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={1}
          readOnly
        />
      </div>
      <div className="author">
        By:
        {author}
      </div>
    </div>
  );
}

export default Review;
