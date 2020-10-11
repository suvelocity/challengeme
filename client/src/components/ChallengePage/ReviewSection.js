import React, { useEffect, useState } from "react";
import Review from "./Review.js";
import axios from "axios";

const data = [
  {
    author: "author",
    title: "title",
    createdAt: "date",
    content: "sadsadsadasdasd",
    rating: 4,
  },
];

function ReviewSection(props) {
  const [revArr, setRevArr] = useState([]);

  const getReviews = async () => {
    const reviews = await axios
      .get(`/api/v1/reviews/byChallenge/${props.challengeId}`)
      .then((res) => res.data);
    const filteredRevs = reviews.filter(
      (item) => item.title !== undefined && item.content !== undefined
    );
    setRevArr(filteredRevs);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      {revArr.map((item, i) => (
        <Review
          key={i}
          author={item.author}
          createdAt={item.createdAt}
          title={item.title}
          content={item.content}
          rating={item.rating}
        />
      ))}
    </div>
  );
}

export default ReviewSection;
