import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import { Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ChallengePage.css';
import ReviewsTab from '../../components/InfoTable/Tabs/ReviewsTab/ReviewsTab';
import SubmitModal from '../../components/SubmitModal/SubmitModal';
import network from '../../services/network';
import Loading from '../../components/Loading/Loading';
import FilteredLabels from '../../context/FilteredLabelsContext';

const useStyles = makeStyles(() => ({
  getStartedButton: {
    background: 'linear-gradient(270deg, rgba(55,99,192,1) 0%, rgba(87,159,223,1) 100%)',
    color: 'white',
    marginBottom: '10px',
  },
  getStartedButtonContainer: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  SubmitdButton: {
    background: 'linear-gradient(270deg, rgba(55,99,192,1) 0%, rgba(87,159,223,1) 100%)',
    color: 'white',
    marginBottom: '10px',
    fontSize: '15px',
  },
  SubmitdButtonFail: {
    background: 'linear-gradient(270deg, rgba(193,36,36,1) 0%, rgba(214,95,95,1) 100%)',
    color: 'white',
    marginBottom: '10px',
    fontSize: '15px',
  },
  SubmitdButtonSuccess: {
    background: 'linear-gradient(270deg, rgba(36,193,67,1) 0%, rgba(130,214,95,1) 100%);',
    color: 'white',
    marginBottom: '10px',
    fontSize: '15px',
  },
}));

function generateTime(date) {
  let today = new Date(date);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return `${today}`;
}

function ChallengePage({ darkMode }) {
  const [submissions, setSubmissions] = useState();
  const [challenge, setChallenge] = useState(null);
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();
  const [loadingReq, setLoadingReq] = useState(false);

  const filteredLabels = useContext(FilteredLabels);

  const getUpdated = useCallback((dateToFactor) => {
    const dateNow = Date.now();
    const updateRepoDate = new Date(dateToFactor);
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
  }, []);

  useEffect(() => {
    (async () => {
      const { data: submission } = await network.get(
        `/api/v1/challenges/${id}/${Cookies.get('userName')}/submission`,
      );
      if (submission) {
        setSubmissionStatus({
          state: submission.state,
          createdAt: submission.createdAt,
        });
      } else {
        setSubmissionStatus(null);
      }
      setLoadingReq(true);
    })();
    const getSubmissionInterval = setInterval(async () => {
      const { data: submission } = await network.get(
        `/api/v1/challenges/${id}/${Cookies.get('userName')}/submission`,
      );
      if (submission) {
        setSubmissionStatus({
          state: submission.state,
          createdAt: submission.createdAt,
        });
      } else {
        setSubmissionStatus(null);
      }
      setLoadingReq(true);
    }, 5000);
    const setImg = async () => {
      try {
        const { data } = await network.get(`/api/v1/image?id=${id}`);
        setImage(data.img);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchChallenge = async () => {
      try {
        const {
          data: challengeFromServer,
        } = await network.get(`/api/v1/challenges/${id}`);
        setChallenge(challengeFromServer);
        setRating(
          challengeFromServer.averageRaiting
            ? Math.round(challengeFromServer.averageRaiting)
            : 0,
        );
        setSubmissions(challengeFromServer.submissionsCount);
        try {
          const { data: repo } = await network.get(
            `/api/v1/services/public_repo?repo_name=${challengeFromServer.repositoryName}`,
          );
          const updateDate = repo.updated_at;
          getUpdated(updateDate);
        } catch (error) {
          console.error(error);
          setDate(generateTime(challenge.createdAt));
        }
      } catch (error) {
        console.error(error);
      }
    };
    setImg();
    fetchChallenge();
    return () => clearInterval(getSubmissionInterval);
    // eslint-disable-next-line
  }, [id]);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const getSubmissionButton = () => {
    if (!submissionStatus) {
      return (
        <Button
          className={classes.SubmitdButton}
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Submit
        </Button>
      );
    } if (submissionStatus.state === 'PENDING') {
      return <CircularProgress style={{ marginBottom: '20px' }} />;
    } if (submissionStatus.state === 'SUCCESS') {
      return (
        <Button
          className={classes.SubmitdButtonSuccess}
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Submit again
        </Button>
      );
    }
    return (
      <Button
        className={classes.SubmitdButtonFail}
        variant="contained"
        onClick={() => setIsModalOpen(true)}
      >
        Submit again
      </Button>
    );
  };

  const getSubmissionStatus = () => {
    if (!submissionStatus) {
      return (
        <div>
          <p>
            You have not submitted any solution to this challenge yet, challenger! Prove
            your worth.
          </p>
        </div>
      );
    } if (submissionStatus.state === 'SUCCESS') {
      return (
        <div style={{ textAlign: 'center' }}>
          <p>
            <div style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '5px' }}>
              SUCCESS
            </div>
            You have already solved this challenge on
            {' '}
            {generateTime(submissionStatus.createdAt)}
            <br />
            {' '}
            You can submit another solution if you’d like:
          </p>
        </div>
      );
    } if (submissionStatus.state === 'PENDING') {
      return (
        <div>
          <p>Your submission is being tested</p>
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <p>
          <div style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '5px' }}>
            FAIL
          </div>
          You tried to solved this challenge on
          {' '}
          {generateTime(submissionStatus.createdAt)}
          {' '}
          <br />
          {' '}
          You can try to submit
          again
        </p>
      </div>
    );
  };

  return challenge ? (
    <div style={{ overflowY: 'auto', height: '100vh', width: '100%' }}>
      <div className="one-challenge-container">
        <div className="one-challenge-challenge-container">
          <h1 className="one-challenge-info-title">
            <b>{challenge.name}</b>
          </h1>
          <img className="one-challenge-info-image" src={image} alt="" />
          <div className="one-challenge-info-container">
            <div className="one-challenge-description-title">
              <b>Description:</b>
              <div className="challenge-label">
                {challenge.Labels
                  && challenge.Labels.map((label) => (
                    <Link
                      className="link-rout"
                      key={label.id}
                      to="/"
                      onClick={() => filteredLabels.setFilteredLabels([label.id])}
                    >
                      <div className="one-challenge-labels">{label.name}</div>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="one-challenge-description-body">
              {challenge.description}
            </div>
            <div className="one-challenge-author-uploaded-updated">
              <div>
                Submissions:
                {' '}
                {submissions}
              </div>
              <div className="one-challenge-author">
                Created by:
                {' '}
                {challenge.Author.userName}
              </div>
              <div className="one-challenge-uploaded-at">
                Created At:
                {' '}
                {`${generateTime(challenge.createdAt)} `}
              </div>
              <div className="one-challenge-updated-at">
                Updated At:
                {' '}
                {date || ''}
              </div>
            </div>
            <div className="one-challenge-rating">
              <Rating name="half-rating-read" value={rating} readOnly size="large" />
            </div>
          </div>
          <div className={classes.getStartedButtonContainer}>
            <Button
              variant="contained"
              className={classes.getStartedButton}
              href={`https://github.com/${challenge.boilerPlate}`}
              target="_blank"
            >
              Start this challenge
            </Button>
          </div>
        </div>
        <div className="one-challenge-submission-container">
          {loadingReq ? (
            <div className="one-challenge-submit-btn">
              <div className="submission-status">{getSubmissionStatus()}</div>
              {getSubmissionButton()}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress style={{ margin: '30px' }} />
            </div>
          )}
          <SubmitModal
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            challengeParamId={id}
          />
        </div>
        <div className="one-challenge-reviews-container">
          <b className="one-challenge-reviews-title">Reviews :</b>
          <ReviewsTab challengeId={challenge.id} />
        </div>
      </div>
    </div>
  ) : (
    <Loading darkMode={darkMode} />
  );
}

export default ChallengePage;
