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
  description: "in this challenge we up cloneup clone this and start hirluling",
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
  // const [challenge, setChallenge] = useState({});

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const { data: challengeFromServer } = await axios.get(
          `/api/v1/challenges/${challengeParamId}`
        );
        console.table(challenge);
        // setChallenge(challengeFromServer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChallenge();
  }, []);

  return challenge ? (
    <div className='fullpage-wrapper'>
      <div className='navbar'>im navbar</div>
      <div className='challenge-wrapper'>
        <div className='challenge-left-wrapper'>
          <div className='challenge-img-div'>
            <img className='challenge-img' src={challenge.cover} />
          </div>
          <div className='challenge-rawdata'>
            <span className='challenge-created-by'>
              <p> created by: </p> <p>user name</p>
            </span>
            <span className='challenge-created-at'>
              <p> Created at: </p>{" "}
              <p>{normalizeDate(challenge.createdAt) + " "} </p>
            </span>
            <span className='challenge-updated-at'>
              <p> Updated at: </p> <p>{normalizeDate(challenge.updatedAt)}</p>
            </span>
          </div>
          <div className='challenge-labels'>
            <h2>Labels:</h2>
            <span className='challenge-label'>
              <Chip
                color='secondary'
                label='difficulty'
                component='a'
                href='#chip'
                clickable
              />
            </span>
            {challenge.label.map((tag, index) => (
              <span key={index} className='challenge-label'>
                <Chip
                  color='primary'
                  label={tag}
                  component='a'
                  href='#chip'
                  clickable
                />
              </span>
            ))}
          </div>
          <div className='challenge-rating'>
            <h2>Rating:</h2>
            <Rating
              name='half-rating-read'
              defaultValue={3}
              precision={0.5}
              readOnly
              size='large'
            />
          </div>
          <div className='challenge-github-btn'>
            <Button color='primary' href={challenge.githubLink}>
              To Github!
            </Button>
          </div>
        </div>

        <div className='challenge-right-wrapper'>
          <div className='challenge-title-description'>
            <h1>{challenge.name}</h1>
            <div className='challenge-description'>
              <p>{challenge.description}</p>
            </div>
          </div>
          <div className='challenge-table'>table modal</div>
          <div className='challenge-submit-btn'>
            <Button color='primary' className='submit-btn'>
              Submit
            </Button>
          </div>
        </div>

        {/* <SubmitModal /> */}
        {/* <SubmissionTable /> */}
        {/* <ReviewsSection /> */}
      </div>
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
