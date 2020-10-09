import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import network from "../../services/network";

import { Button, Link } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";

// import ChallengeTabs from "./SolutionTable";
//import SubmitModal from "./SubmitModal";

import SubmitModal from "./SubmitModal";
import SolutionTable from "./SolutionTable";

// import ChallengePage from "./ChallengePage";
//import SubmissionTable from "./SubmissionTable";

import "./ChallengePage.css";

const mockChallenge = {
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
const userId = 2; //Mock until we merge shahar

function ChallengePage() {
  const [challenge, setChallenge] = useState(null);
  const { challengeParamId } = useParams();
  const [blobedImg, setBlobedImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const setImg = async () => {
      try {
        const { data } = await network.get(
          `/api/v1/images?id=${challengeParamId}`
        );
        setBlobedImg(data.img);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchChallenge = async () => {
      try {
        const { data: challengeFromServer } = await axios.get(
          `/api/v1/challenges/${challengeParamId}`
        );
        console.log('challenge from server: ',challengeFromServer);
        setChallenge(challengeFromServer);
      } catch (error) {
        console.log(error);
      }
    };
    setImg();
    fetchChallenge();
    console.log('challenge is: ',challenge);
  }, []);

  function handleModalClose() {
    setIsModalOpen(false);
  }
  // console.table(challenge);
  return challenge ? (
    <div className='fullpage-wrapper'>
      <div className='navbar'>im navbar</div>
      <div className='challenge-wrapper'>
        <div className='challenge-left-wrapper'>
          <div className='challenge-img-div'>
            <img className='challenge-img' src={blobedImg} />
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
            {/* <span className='challenge-label'>
              <Chip
                color='secondary'
                label='difficulty'
                component='a'
                href='#chip'
                clickable
              />
            </span> */}
            {challenge.Labels.map((tag, index) => (
              <span key={index} className='challenge-label'>
                <Chip
                  color='primary'
                  label={tag.name}
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
            <div className='challenge-name'>
              <h1>{challenge.name}</h1>
            </div>
            <div className='challenge-description'>
              <p>{challenge.description}</p>
            </div>
            {/* change prop to params.id */}
          </div>
          <div className='challenge-solution-table'>
            <SolutionTable challengeParamId={challengeParamId} />
          </div>
          <div className='challenge-submit-btn'>
            <Button color='primary' onClick={setIsModalOpen}>
              Submit
            </Button>
          </div>
        </div>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        challengeParamId={challengeParamId}
        userId={userId}
      />
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
