import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Rating } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import network from '../../services/network';
function getModalStyle() {
  return {
    outline: 0,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formValidationError: {
    color: 'red',
    fontSize: '0.8em',
  },
}));

function SubmitModal({ isOpen, handleClose, challengeParamId, userId }) {
  /* eslint-disable no-unused-vars */
  const { register, handleSubmit, watch, errors } = useForm();
  /* eslint-enable no-unused-vars */
  const [userRating, setUserRating] = useState();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const submitForm = async (data) => {
    // VIEW SUBMITTED SUCCESSFULLY/FAILED TO SUBMITT MESSAGE and close modal
    const formData = {
      ...data,
      userId,
    };
    try {
      const res = await network.post(`/${challengeParamId}/apply`, formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
    // data object looks like:
    // {
    //  commentContent: "the content of the comment"
    //  commentTitle: "title for the comment"
    //  rating: 4, -> can't be null
    //  repository: "drormaman/pokedex", -> can't be null
    //  userId: 3 -> can't be null
    // }
    console.log(formData);
  };

  // console.log(watch("repository"));

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={modalStyle} className={classes.paper}>
        <form
          onSubmit={handleSubmit(submitForm)}
          style={{
            // height: "60vh",
            display: 'flex',
            flexDirection: 'column',
            // alignItems: "flex-start"
          }}
        >
          <Typography variant='h5'>Submit Your Solution</Typography>
          <TextField
            label='Solution repository'
            type='text'
            id='repoInput'
            name='repository'
            placeholder='Owner/Repo'
            style={{ marginTop: 8 }}
            inputRef={register({
              required: true,
              pattern: /^([^ ]+\/[^ ]+)$/,
            })}
          />
          {errors.repository?.type === 'pattern' && (
            <Typography
              variant='caption'
              className={classes.formValidationError}
            >
              The text should look like "username/repository-name"
            </Typography>
          )}
          {errors.repository?.type === 'required' && (
            <Typography
              variant='caption'
              className={classes.formValidationError}
            >
              Please enter a solution repository
            </Typography>
          )}

          {/*  this input is invisible, only here for the rating to work in the form */}
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography component='subtitle1'>Rate this challenge</Typography>
            <Rating
              name='rating'
              value={userRating}
              // precision={0.5}
              onChange={(_, value) => setUserRating(value)}
            />
          </div>
          <input
            name='rating'
            type='number'
            value={userRating}
            ref={register({ required: true })}
            hidden
            readOnly
          />
          {errors.rating?.type === 'required' && (
            <Typography
              variant='caption'
              className={classes.formValidationError}
            >
              Please rate this challenge
            </Typography>
          )}
          <Typography variant='subtitle1' style={{ marginTop: 16 }}>
            Please leave your review here
          </Typography>
          <TextField
            label='Title'
            type='text'
            id='commentTitleInput'
            placeholder='Comment Title'
            name='commentTitle'
            inputRef={register({ maxLength: 100 })}
            variant='filled'
          />
          {errors.commentTitle?.type === 'maxLength' && (
            <Typography
              variant='caption'
              className={classes.formValidationError}
            >
              Title should be less than 100 characters
            </Typography>
          )}
          <TextField
            id='reviewContentInput'
            label='Message'
            multiline
            rows={4}
            placeholder='Leave your message here'
            name='commentContent'
            inputRef={register({ maxLength: 255 })}
            variant='filled'
            style={{ marginTop: 8 }}
          />
          {errors.commentContent?.type === 'maxLength' && (
            <Typography
              variant='caption'
              className={classes.formValidationError}
            >
              Your message should be less than 100 characters
            </Typography>
          )}

          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{ marginTop: 16 }}
          >
            submit
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default SubmitModal;
