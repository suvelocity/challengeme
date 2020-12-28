import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { Logged } from '../../context/LoggedInContext';
import network from '../../services/network';
import AvatarProfile from './AvatarProfile';
import '../../styles/Review.css';

function Review({
  author, createdAt, title, content, rating, reviewId,
}) {
  const [date, setDate] = useState('');
  // TODO: POP: use moment instead
  const location = useHistory();
  const LoggedContext = useContext(Logged);
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
        await network.delete(`/api/v1/reviews/${reviewId}`);
      }
    } catch (error) {
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
      ;
      Cookies.remove('userId');
      Cookies.remove('userName');
      LoggedContext.setLogged(false);
      location.push('/');
    }
  };

  return (
    <div className="Review">
      <div className='Review-Left'>
        <div className='flex-row'>
          <div className="Review-Avatar-Container" >
            <AvatarProfile className="Review-Avatar" />
          </div>
          <div className="Review-Author">{author}</div>
        </div>
      </div>
      <div className='Review-Middle'>
        <div className="Review-Title" cy-test="review-title">{title}</div>
        <div className="Review-CreatedAt">{date}</div>
        <div className="Review-Content">{content}</div>

      </div>
      <div className='Review-Right'>
        <div className='flex-row'>
          <div >
            <p className="Review-Rating-Number">{rating}</p>
          </div>
          <p className='Review-Rating-Part-Of'>out of 5</p>
        </div>
      </div>
      {LoggedContext.isAdmin && (
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          variant="contained"
          color="secondary"
          onClick={deleteReview}
        >
          Delete
        </DeleteIcon>
      )}
    </div>
  );
}

export default Review;
