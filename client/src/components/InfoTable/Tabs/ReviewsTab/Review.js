import React, { useEffect, useState, useContext } from 'react';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Logged } from "../../../../context/LoggedInContext";
import network from '../../../../services/network';
import Rating from '@material-ui/lab/Rating';
import { Button } from '@material-ui/core';
import './Review.css';

function Review({
  author, createdAt, title, content, rating, reviewId
}) {
  const [date, setDate] = useState('');
  // TODO: POP: use moment instead
  const location = useHistory();
  const loggedContext = useContext(Logged);
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

  const deleteReview = async () => {
    try {
      const isDeleteOk = prompt("Who's your favorite student?");
      if (isDeleteOk != null) {
        await network.delete(`/api/v1/reviews/${reviewId}`)
      }
    } catch (error) {
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      Cookies.remove("name");
      Cookies.remove("userId");
      Cookies.remove("isAdmin");
      Cookies.remove("userName");
      loggedContext.setLogged(false);
      location.push("/");
    }
  }

  return (
    <div className="review" cy-test="challenge-single-review">
      <div className="title" cy-test="review-title">{title}</div>
      <div className="createdAt" cy-test="review-createdAt">{date}</div>
      <div className="content" cy-test="review-content">{content}</div>
      <div className="rating" cy-test="review-rating">
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={1}
          readOnly
        />
      </div>
      <div className="author" cy-test="review-author">
        By:
        {author}
      </div>
      {Cookies.get('isAdmin') === 'admin' &&
        <Button variant="contained" color="secondary"
          onClick={deleteReview}
        >Delete</Button>}
    </div>
  );
}

export default Review;
