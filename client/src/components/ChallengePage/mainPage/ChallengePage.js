import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import network from '../../../services/network';
import { Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import './ChallengePage.css';
import SubmitModal from '../SubmitModal';
import InfoTable from '../InfoTable/InfoTable';

// TODO: clean all console alert and logs before merge

// we have two users
// 1. author- the user which uploaded that challenge
// 2. user -  the user that is logged in to the system

function normalizeDate(dateTime) {
  //"2020-10-04T12:00:00.000Z";
  const date = dateTime.split('T')[0];
  return date;
}

export default function ChallengePage() {
  const [challenge, setChallenge] = useState(null);
  const [author, setAuthor] = useState({ username: 'Dror' });
  const { challengeParamId } = useParams();
  const [blobedImg, setBlobedImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkModeIsOn, setDarkModeIsOn] = useState(false);
 
  console.log(challenge)
  useEffect(() => {
    const setImg = async () => {
      try {
        const { data } = await network.get(
          `/api/v1/image?id=${challengeParamId}`
        );
        setBlobedImg(data.img);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchChallenge = async () => {
      try {
        let {
          data: { challenge: challengeFromServer, author },
        } = await network.get(`/api/v1/challenges/${challengeParamId}`);
        challengeFromServer.author = author;
        setChallenge(challengeFromServer);
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

  return challenge ? (
    <div className='fullpage-wrapper'>
      <div
        className={
          darkModeIsOn ? 'dark-challenge-wrapper' : 'light-challenge-wrapper'
        }
      >
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
              darkModeIsOn ? 'challenge-rawdata-dm' : 'challenge-rawdata'
            }
          >
            <span className='challenge-created-by'>
              <p>{`Created By:${challenge.author&&challenge.author.userName}`}</p>
            </span>
            <span className='challenge-created-at'>
              <p>Created At: </p>{' '}
              <p>{normalizeDate(challenge.createdAt) + ' '} </p>
            </span>
            <span className='challenge-updated-at'>
              <p>Updated At: </p> <p>{normalizeDate(challenge.updatedAt)}</p>
            </span>
          </div>
          <div
            className={
              darkModeIsOn ? 'challenge-labels-dm' : 'challenge-labels'
            }
          >
            <h2 className={darkModeIsOn ? 'dark-h2' : 'light-h2'}>Labels:</h2>
            <span className='challenge-label'>
              {challenge['Labels'].map((label) => (
                <Link
                  to={`/?labelId=${label['labels_to_challenges']['label_id']}`}
                >
                  {console.log(label)}
                  <Chip color='primary' label={label.name} component='a' />
                </Link>
              ))}
            </span>
          </div>
          <div className='challenge-rating'>
            <h2 className={darkModeIsOn ? 'dark-h2' : 'light-h2'}>Rating:</h2>
            <Rating
              name='half-rating-read'
              defaultValue={5}
              precision={0.5}
              readOnly
              size='large'
            />
          </div>
          <div
            className={
              darkModeIsOn ? 'challenge-github-btn-dm' : 'challenge-github-btn'
            }
          >
            <Button
              color='primary'
              href={`https://github.com/suvelocity/${challenge.boilerPlate}`}
            >
              Fork boiler plate
            </Button>
          </div>
        </div>
        <div className='challenge-right-wrapper'>
          <div className='challenge-title-description'>
            <div className='challenge-name'>
              <h1 className={darkModeIsOn ? 'dark-h1' : 'light-h1'}>
                {challenge.name}
              </h1>
            </div>
            <div
              className={
                darkModeIsOn
                  ? 'challenge-description-dm'
                  : 'challenge-description'
              }
            >
              <p>{challenge.description}</p>
            </div>
          </div>
          <div className='challenge-solution-table'>
            <InfoTable
              challengeId={challengeParamId}
              darkModeIsOn={darkModeIsOn}
            />
          </div>
          <div
            className={
              darkModeIsOn ? 'challenge-submit-btn-dm' : 'challenge-submit-btn'
            }
          >
            <Button color='primary' onClick={() => setIsModalOpen(true)}>
              Submit
            </Button>
          </div>
        </div>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        challengeParamId={challengeParamId}
      />
    </div>
  ) : (
    <div>Loading</div>
  );
}
