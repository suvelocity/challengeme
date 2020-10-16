import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import network from "../../services/network";
import { Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import "./ChallengePage.css";
import SubmitModal from "../../components/SubmitModal/SubmitModal";
import InfoTable from "../../components/InfoTable/InfoTable";

// TODO: clean all console alert and logs before merge

// we have two users
// 1. author- the user which uploaded that challenge
// 2. user -  the user that is logged in to the system

function generateTime(date) {
  let today = new Date(date);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return `${today}`;
}

export default function ChallengePage() {
  const [challenge, setChallenge] = useState(null);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getUpdated = useCallback(
    (date) => {
      const dateNow = Date.now();
      const updateRepoDate = new Date(date);
      let diff = (dateNow - updateRepoDate.getTime()) / 1000 / 60 / 60;
      if (diff < 24) {
        setDate(`${Math.floor(diff)} Hours ago`);
      } else {
        diff = diff / 24;
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
    },
    [id]
  );

  useEffect(() => {
    const setImg = async () => {
      try {
        const { data } = await network.get(`/api/v1/image?id=${id}`);
        setImage(data.img);
      } catch (error) {}
    };
    const fetchChallenge = async () => {
      try {
        let {
          data: { challenge: challengeFromServer, author },
        } = await network.get(`/api/v1/challenges/${id}`);
        challengeFromServer.author = author; // TODO: format request to the server api...
        setChallenge(challengeFromServer);
        setRating(Math.round(challengeFromServer.Reviews[0].averageRating));
        try {
          const { data: repo } = await network.get(
            `/api/v1/services/public_repo?repo_name=${challengeFromServer.repositoryName}`
          );
          const updateDate = repo.updated_at;
          getUpdated(updateDate);
        } catch (e) {
          setDate(generateTime(challenge.createdAt));
        }
      } catch (error) {}
    };
    setImg();
    fetchChallenge();
  }, [id]);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return challenge ? (
    <div className='fullpage-wrapper'>
      <div className='light-challenge-wrapper'>
        <div className='challenge-left-wrapper'>
          <div className='challenge-img-div'>
            <img className='challenge-img' src={image} alt={challenge.name} />
          </div>
          <div className='challenge-rawdata'>
            <span className='challenge-created-by'>
              {/* TODO: fix that <p>Created By: </p> <p>{challenge.author.userName}</p>  */}
            </span>
            <span className='challenge-created-at'>
              <p>Created At: </p>{" "}
              <p>{generateTime(challenge.createdAt) + " "} </p>
            </span>
            <span className='challenge-updated-at'>
              <p>Updated At: </p> <p>{date ? date : ""}</p>
            </span>
          </div>
          <div className='challenge-labels'>
            <h2 className='light-h2'>Labels:</h2>
            <span className='challenge-label'>
              {challenge["Labels"] &&
                challenge["Labels"].map((label) => (
                  <Link to={`/?labelId=${label["LabelChallenge"]["labelId"]}`}>
                    <Chip color='primary' label={label.name} component='a' />
                  </Link>
                ))}
            </span>
          </div>
          <div className='challenge-rating'>
            <h2 className='light-h2'>Rating:</h2>
            <Rating
              name='half-rating-read'
              value={rating}
              readOnly
              size='large'
            />
          </div>
          <div className='challenge-github-btn'>
            <Button
              color='primary'
              href={`https://github.com/${challenge.boilerPlate}`}
            >
              Fork boiler plate
            </Button>
          </div>
        </div>
        <div className='challenge-right-wrapper'>
          <div className='challenge-title-description'>
            <div className='challenge-name'>
              <h1 className='light-h1'>{challenge.name}</h1>
            </div>
            <div className='challenge-description'>
              <p>{challenge.description}</p>
            </div>
          </div>
          <div className='challenge-solution-table'>
            <InfoTable challengeId={id} />
          </div>
          <div className='challenge-submit-btn'>
            <Button color='primary' onClick={() => setIsModalOpen(true)}>
              Submit
            </Button>
          </div>
        </div>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        challengeParamId={id}
      />
    </div>
  ) : (
    <div>Loading</div>
  );
}
