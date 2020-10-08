import React, { useState, useEffect } from "react";
// import axios from 'axios'
import network from '../../services/network'
import { Button, Link } from "@material-ui/core";
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

const makeBlobed = async (img) =>{
  const  preBlobedImg  = await fetch(img)
  const blobedImg = await preBlobedImg.blob()
  return blobedImg
}

function ChallengePage() {

  //const [challengeInfo,setChallengeInfo] = useState('');
  const [blobedImg, setBlobedImg] = useState("")
  
  const setImg = async () => {
    const { data } = await network.get(`/api/v1/images?id=${1}`)
    console.log(data);
    const blobed = await makeBlobed(data.img)
    const imgURL = URL.createObjectURL(blobed);
    // console.log(imgURL);
    setBlobedImg(imgURL)
  }
  useEffect(() => {
    //setChallengeInfo(axios.get('url:id').data);
    // console.log(blobedImg);
    setImg()
    console.log(blobedImg);
// =======
  // const [challenge, setChallenge] = useState({});

  // useEffect(() => {
  //   const fetchChallenge = async () => {
  //     try {
  //       const { data: challengeFromServer } = await axios.get(
  //         `/api/v1/challenges/${challengeParamId}`
  //       );
  //       console.table(challenge);
  //       // setChallenge(challengeFromServer);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchChallenge();
// >>>>>>> 36f2077c2c283d389024cb3a91620c0a4000d5e0
  }, []);

  return challenge && blobedImg ? (
    <div className="challenge-wrapper">
      <div className="challenge-header">
        <h1 className="challenge-name">{challenge.name}</h1>
        <img className="challenge-img" src={blobedImg} alt="this is an image alt"/>

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
        <div className='challenge-description'>
          {challenge.label.map((tag, index) => (
            <span className='challenge-label' key={index}>
              <Chip
                color="primary"
                label={tag}
                component="a"
                href="#chip"
                clickable
              />
            </span>
          ))}
          <p className="challenge-description">{challenge.description}</p>
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
