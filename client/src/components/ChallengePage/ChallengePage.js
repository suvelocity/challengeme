import React, { useState, useEffect } from "react";
import { Button, Link } from "@material-ui/core";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
//import SubmitModal from "./SubmitModal";
// import ChallengePage from "./ChallengePage";
//import SubmissionTable from "./SubmissionTable";
import "./ChallengePage.css";

const challenge = {
  cover: "https://storage.googleapis.com/challenges-cover/tvv_f.png",
  createdAt: "2020-10-04T12:00:00.000Z",
  deletedAt: null,
  description: "in this challenge we will build some shit",
  githubLink: "https://github.com/suvelocity/TV-shows-boilerplate",
  id: 4,
  name: "React - Tv shows",
  repositoryName: "suvelocity/TV-shows-challenge",
  type: "client",
  updatedAt: "2020-10-04T12:00:00.000Z",
  createdBy: "user231",
  label: ["React", "JS", "Promise"],
  rating: 3.7,
  isSaved: true,
};

const challengeParamId = 3; //Mock until we merge shahar

function ChallengePage() {
  const [challenge, setChallenge] = useState({challenge});

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const { data: challengeFromServer } = await axios.get(
          `/api/v1/challenges/${challengeParamId}`
        );
        console.table(challenge);
        setChallenge(challengeFromServer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChallenge();
  }, []);

  return challenge ? (
    <div className="challenge-wrapper">
      <div className="challenge-header">
        <h1 className="challenge-name">{challenge.name}</h1>
        <img className="challenge-img" src={challenge.cover} />

        <Button color="primary" href={challenge.githubLink}>
          To Github!
        </Button>
        <div className="challenge-rating">
          <Rating
            name="half-rating-read"
            defaultValue={3}
            precision={0.5}
            readOnly
          />
        </div>
        <span className="challenge-difficulty"></span>
      </div>
      <div className="challenge-description-wrapper">
        <div className="challenge-rawdata">
          <span className="challenge-created-at">
            Created at: {normalizeDate(challenge.createdAt) + " "}
          </span>
          <span className="challenge-updated-at">
            Updated at: {normalizeDate(challenge.updatedAt)}
          </span>
        </div>
        <div className="challenge-description">
          {challenge.label.map((tag, index) => (
            <span key={index} className="challenge-label">
              <Chip
                color="primary"
                label={tag}
                component="a"
                href="#chip"
                clickable
              />
            </span>
          ))}
          <p className="challenge-description" id="challenge-description">{challenge.description}</p>
          <Button color="primary" className="submit-btn">
            Submit
          </Button>
        </div>
      </div>

      {/* <SubmitModal /> */}
      {/* <SubmissionTable /> */}
      {/* <ReviewsSection /> */}
    </div>
  ) : (
    <div>Loading</div>
  );
}

function normalizeDate(dateTime) {
  //"2020-10-04T12:00:00.000Z";
  const date = dateTime.split("T")[0];
  return date;
}
export default ChallengePage;
