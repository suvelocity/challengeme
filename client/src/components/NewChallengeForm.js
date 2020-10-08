import React, { useEffect, useState } from 'react';
import network from '../services/network';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, InputLabel, MenuItem, FormControl, Select, TextField, TextareaAutosize, Button } from '@material-ui/core';

export default function NewChallengeForm() {
  const [optionsArray, setOptionsArray] = useState([]); 
  const [badInput, setBadInput] = useState([]); 
  const [repoName, setRepoName] = useState(''); 
  const [repoLink, setRepoLink] = useState(''); 
  const [repoDescription, setRepoDescription] = useState(''); 
  const [repoType, setRepoType] = useState('');

  useEffect(() => {
    openOptions();
  }, [])

  const openOptions = async () => {
  const { data: types } = await network.get('/api/v1/new-challenge/type') // change api
  setOptionsArray(types.map((type, index) =>
    <MenuItem key={index} value={type}>{type}</MenuItem>
    ))
  }

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

  const spaces = new RegExp(/^(\s{1,})$/);
  const handleSubmit = async () => {
    let newBadInput = [];
    if(repoName.length < 2 || repoName.match(spaces)) {
      newBadInput.push("* Repository's name is too short (minimum 2 characters)");
    }
    try {
      if(repoLink.length > 2 && !repoLink.match(spaces)) {
        await network.get(`https://api.github.com/repos/${repoLink}`)
      } else {
        throw 'error';
      }
    } catch(err) {
      newBadInput.push(`* Repository's Link is not valid. Check the suggestions below:
      - Type the Github repository in this format: owner/repo
      - Change your repository to public
      - Check for type errors`);
    }
    if(repoDescription.length < 20 || repoDescription.match(spaces)) {
      newBadInput.push("* Repository's Description is too short (minimum 20 characters)");
    } else if(repoDescription.length > 1000) {
      newBadInput.push("* Repository's Description is too long (maximum 1000 characters)");
    }
    if(!repoType) {
      newBadInput.push("* Repository's type not selected");
    }
    setBadInput(newBadInput);
    setTimeout(() => {
      return setBadInput([]);
    }, 5000);
    if(newBadInput.length === 0) {
      const newRepo = {
        name: repoName,
        description: repoDescription,
        type: repoType,
        repositoryName: repoLink,
        // cover: repo
      }
      await network.post(`/api/v1/new-challenge`, newRepo)
      .catch(error => setBadInput[error.message])
    }
  }

  return (
  <div className='newChallenge'>
    <div className='newChallengeForm'>
    <Typography variant='h5' gutterBottom className='header'>
      New Challenge
    </Typography>
      <FormControl className={classes.root} noValidate autoComplete='off'>
        <TextField id='name' label='Challenge name' onChange={event => setRepoName(event.target.value)}/>
        <TextField id='repo' label='Challenge link' onChange={event => setRepoLink(event.target.value)}/>
        <TextareaAutosize aria-label='Description' rowsMin={3} rowsMax={10} placeholder='Challenge description...' onChange={event => setRepoDescription(event.target.value)}/>

        {/* drop-n-crop component */}

        <FormControl className={classes.formControl}>
          <InputLabel id='Challenge type'>Challenge type</InputLabel>
          <Select
            labelId='Challenge type'
            id='Challenge type'
            value={repoType}
            onChange={event => setRepoType(event.target.value)}
            required
          >
            {optionsArray.map(x=>x)}
          </Select>
          <Typography color='error' className='displayErrors'>
            {badInput.join(`\n`)}
          </Typography>
        </FormControl><br />
        <Button variant='contained' color='primary' type='submit' onClick={handleSubmit}>Submit</Button>
        <Button variant='contained' color='secondary' type='reset' /*onClick={handleReset}*/>Clear Values</Button>
      </FormControl>
    </div>
  </div>
  );
}