import React, { useEffect, useState } from 'react';
import network from '../services/network';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, InputLabel, MenuItem, FormControl, Select, TextField, Button } from '@material-ui/core';

export default function NewChallengeForm() {
  const [optionsArray, setOptionsArray] = useState([]); 
  const [type, setType] = React.useState('');

  useEffect(() => {
    openOptions();
  }, [])

  const openOptions = async () => {
  const { data: types } = await network.get('/api/v1/challenges') // change api
  setOptionsArray(types.map(type =>
    <MenuItem value={type.type}>{type.type}</MenuItem>
    ))
  }

  const handleChange = (event) => {
    setType(event.target.value);
  };

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

  return (
  <div className='newChallenge'>
    <div className="newChallengeForm">
    <Typography variant="h5" gutterBottom className='header'>
      New Challenge
    </Typography>
      <FormControl className={classes.root} noValidate autoComplete="off">
        <TextField id="name" label="Challenge name"/>
        <TextField id="repo" label="Github repository link"/>
        <TextField id="description" label="Description"/>

        {/* drop-n-crop component */}

        <FormControl className={classes.formControl}>
          <InputLabel id="Challenge type">Challenge type</InputLabel>
          <Select
            labelId="Challenge type"
            id="Challenge type"
            value={type}
            onChange={handleChange}
            required
          >
            {optionsArray.map(x=>x)}
          </Select>
        </FormControl><br />
        <Button variant="contained" color="primary" type="submit">Submit</Button>
        <Button variant="contained" color="secondary" type="reset" onClick={'reset'}>Clear Values</Button>
      </FormControl>
    </div>
  </div>
  );
}