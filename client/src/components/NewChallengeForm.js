import React, { useEffect, useState } from 'react';
import network from '../services/network';
import AddImg from './AddImg';
import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, InputLabel, MenuItem, FormControl, Select, TextField, TextareaAutosize, Button } from '@material-ui/core';

export default function NewChallengeForm() {
  const [darkMode, setDarkMode] = useState(false); 
  const [optionsArray, setOptionsArray] = useState([]); 
  const [badInput, setBadInput] = useState([]); 
  const [repoName, setRepoName] = useState(''); 
  const [repoLink, setRepoLink] = useState(''); 
  const [repoDescription, setRepoDescription] = useState(''); 
  const [repoType, setRepoType] = useState('');
  const [file,setFile] = useState({})

  useEffect(() => {
    openOptions();
  }, [])

  // pull challenge's type options from .github/workflows folder
  const openOptions = async () => {
  const { data: types } = await network.get('/api/v1/new-challenge/type');
  setOptionsArray(types.map((type, index) => 
    <MenuItem key={index} value={type}>{type}</MenuItem>
    ))
  }

  // material ui styling
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  // validate data before poting and submiting challenge
  const spaces = new RegExp(/^(\s{1,})$/);
  const hebrew = new RegExp(/^.*([\u0590-\u05FF]{1,}).*$/);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let newBadInput = [];
    if(repoName.length < 2 || repoName.match(spaces) || repoName.match(hebrew)) {
      newBadInput.push("* Repository's name is too short (minimum 2 characters).\n  Don't use hebrew letters");
    }
    try {
      if(repoLink.length > 2 && !repoLink.match(spaces) && !repoLink.match(hebrew)) {
        await network.get(`https://api.github.com/repos/${repoLink}`)
      } else {
        throw 'error';
      }
    } catch(err) {
      newBadInput.push(`* Repository's Link is not valid. Check the suggestions below:
      - Type the Github repository in this format: owner/repo
      - Change your repository to public
      - Check for type errors.\n  Don't use Hebrew letters`);
    }
    if(repoDescription.length < 20 || !!repoDescription.match(spaces) || !!repoDescription.match(hebrew)) {
      newBadInput.push("* Repository's Description is too short (minimum 20 characters).\n  Don't use hebrew letters");
    } else if(repoDescription.length > 500 || repoDescription.match(hebrew)) {
      newBadInput.push("* Repository's Description is too long (maximum 500 characters).\n  Don't use hebrew letters");
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
        repositoryName: repoLink
      }
      // post newRepo to challenge table
      await network.post(`/api/v1/new-challenge`, newRepo)
      .catch(error => {
        newBadInput.push([error.message]);
        setBadInput(newBadInput);
        setTimeout(() => {
          return setBadInput([]);
        }, 5000);
      });
      // get newRepo's challengeId --- bad request - can't send parameter with '/' in it
      // + sholud fire this get only if previous post succeeded
      const repoId = await network.get(`/api/v1/new-challenge/${repoLink}`, newRepo)
      .catch(error => {
        newBadInput.push([error.message]);
        setBadInput(newBadInput);
        setTimeout(() => {
          return setBadInput([]);
        }, 5000);
      });
      // post file as challenge's image
      // + sholud fire this post only if previous get succeeded
      await network.post("/api/v1/image",{
        challengeId: repoId,
        img:file
      }).catch(error => {
        newBadInput.push([error.message]);
        setBadInput(newBadInput);
        setTimeout(() => {
          return setBadInput([]);
        }, 11000);
      });  
    }
  }

  const handleFile = (value) =>{
    if(value.src)
    {
      let i = new Image()
      i.src = value.src
  
      i.onload = () => {
        const width = i.width
        const height = i.height
        console.log(width, " ", height);
        if (width < 800) {
          Swal.fire("invalid image width", "", "error")
          setFile({})
        }
        else if (height < 300) {
          Swal.fire("invalid image height", "", "error")
          setFile({})
        }
        else {
          console.log(value.src.offsetHeight,);
          setFile(value);
        }
      }
    }
    else{
      setFile({})
    }
  }

  const handleReset = () =>{
    setBadInput([])
    setRepoName('')
    setRepoLink('')
    setRepoDescription('')
    setRepoType('')
    setFile({})
    setBadInput([])
  }



  return (
  <div className={`newChallenge ${darkMode ? 'darkMode' : 'lightMode'}`}>
    <form className='newChallengeForm'>
      <Typography variant='h5' gutterBottom className='newChallengeFormheader'>
        New Challenge
      </Typography>
        <TextField id='name' autoComplete="off" className='newChallengeFormFeild' label='Challenge name' onChange={event => setRepoName(event.target.value)}/><br />
        <TextField id='repo' autoComplete="off" className='newChallengeFormFeild' label='Challenge link' onChange={event => setRepoLink(event.target.value)}/><br />
        <TextareaAutosize className='descriptionTextArea' autoComplete="off" aria-label='Description' rowsMin={6} placeholder='Challenge description...' onChange={event => setRepoDescription(event.target.value)}/><br />

      <AddImg file={file} handleChange={handleFile}/><br />

      <FormControl className={classes.formControl}>
          <InputLabel id='Challenge type'>Challenge type</InputLabel>
        <Select
          labelId='Challenge type'
          id='Challenge type'
          className='newChallengeFormFeild'
          value={repoType}
          onChange={event => setRepoType(event.target.value)}
        >
          {optionsArray.map(x=>x)}
        </Select>
      </FormControl><br />
      <Typography color='error' className='displayErrors'>
        {badInput.join(`\n`)}
      </Typography>
      <br />
      <div className='newChallengeFormButtons'>
        <Button variant='contained' color='primary' type='submit' onClick={handleSubmit}>submit</Button>
        <Button variant='contained' color='secondary' type='reset' onClick={handleReset}>clear values</Button>
      </div>
    </form>
  </div>
  );
}