import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import network from "../../../services/network";
import normalizeDate from "../helpers/normalizeDate";
import { Button, Link } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import "./ChallengePage.css";
import SubmitModal from "../SubmitModal";
import InfoTable from "../InfoTable/InfoTable";

// TODO: clean all console alert and logs before merge

// we have two users
// 1. author- the user which uploaded that challenge
// 2. user -  the user that is logged in to the system
const userId = 2; //Mock until we merge shahar

function ChallengePage() {
//   const [chaN
  const [author, setAuthor] = useState({ username: "Dror" });
  const { challengeParamId } = useParams();
  const [blobedImg, setBlobedImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkModeIsOn, setDarkModeIsOn] = useState(false);
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
        // TODO: (Dror) add another migration and column and seed, so each challenge will have the boilerplate and the official repo , talk to shahar team about that change
        let {
          data: { challenge: challengeFromServer, author },
        } = await network.get(`/api/v1/challenges/${challengeParamId}`);
        setChallenge(challengeFromServer);
        setAuthor(author);
      } catch (error) {
        console.log(error);
      }
    };
    setImg();
    fetchChallenge();
  }, [challengeParamId]);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return challenge && author ? (
    <div className='fullpage-wrapper'>
      <div className={darkModeIsOn ? "navbar-dm" : "navbar"}>
        <span>im navbar</span>
        <button
          className='dark_mode_btn'
          onClick={() => {
            setDarkModeIsOn(!darkModeIsOn);
          }}>
          Dark Mode
        </button>
      </div>
      <div
        className={
          darkModeIsOn ? "dark-challenge-wrapper" : "light-challenge-wrapper"
        }>
        <div className='challenge-left-wrapper'>
          <div className='challenge-img-div'>
            <img
              className='challenge-img'
              src={blobedImg}
              alt={challenge.name}
            />
          </div>
          <div
            className={
              darkModeIsOn ? "challenge-rawdata-dm" : "challenge-rawdata"
            }>
            <span className='challenge-created-by'>
              <p>Created By: </p>
              <p>{author.userName}</p>
            </span>
            <span className='challenge-created-at'>
              <p>Created At: </p>
              <p>{normalizeDate(challenge.createdAt) + " "} </p>
            </span>
            <span className='challenge-updated-at'>
              <p>Updated At: </p>
              <p>{normalizeDate(challenge.updatedAt)}</p>
            </span>
          </div>
          <div className='challenge-labels'>
            <h2 className={darkModeIsOn ? "dark-h2" : "light-h2"}>Labels:</h2>
            <span className='challenge-label'>
              {challenge["Labels"].map((label) => (
                <Link>
                  {/* TODO: (ori Sass) talk to shahar where this link goes to... */}
                  <Chip
                    color='primary'
                    label={label.name}
                    component='a'
                    href='#chip'
                    clickable
                  />
                </Link>
              ))}
            </span>
            {/* {challenge.Labels.map((tag, index) => (
              <span key={index} className='challenge-label'>
                <Chip
                  color='primary'
                  label={tag.name}
                  component='a'
                  href='#chip'
                  clickable
                />
              </span>
            ))} */}
          </div>
          <div className='challenge-rating'>
            <h2 className={darkModeIsOn ? "dark-h2" : "light-h2"}>Rating:</h2>
            <Rating
              name='half-rating-read'
              defaultValue={challenge.averageRating}
              precision={0.5}
              readOnly
              size='large'
            />
          </div>
          <div
            className={
              darkModeIsOn ? "challenge-
              -btn-dm" : "challenge-github-btn"
            }>
            <Button
              color='primary'
              href={`https://www.github.com/${challenge.repositoryName}`}>
              To Github!
            </Button>
          </div>
        </div>
        <div className='challenge-right-wrapper'>
          <div className='challenge-title-description'>
            <div className='challenge-name'>
              <h1 className={darkModeIsOn ? "dark-h1" : "light-h1"}>
                {challenge.name}
              </h1>
            </div>
            <div
              className={
                darkModeIsOn
                  ? "challenge-description-dm"
                  : "challenge-description"
              }>
              <p>{challenge.description}</p>
            </div>
          </div>
          <div className='challenge-solution-table'>
            <InfoTable challengeId={challengeParamId} />
          </div>
          <div
            className={
              darkModeIsOn ? "challenge-submit-btn-dm" : "challenge-submit-btn"
            }>
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

export default ChallengePage;
