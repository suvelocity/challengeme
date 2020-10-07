/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const challenges = [
    { id: '1', challengeId:"1", userId: "2", state: "active", solutionRepository:"https://github.com/RoyShnitzel/challenge-sequelize", createdAt:"2020-10-04T13:30:00.000Z", deletedAt: null},
    { id: '2', challengeId:"2", userId: "4", state: "active", solutionRepository:"https://github.com/suvelocity/Authentication-Challenge-TEMPLATE", createdAt:"2020-10-04T13:40:00.000Z", deletedAt: null},
    { id: '3', challengeId:"3", userId: "3", state: "active", solutionRepository:"https://github.com/suvelocity/corona-pandemic-manager", createdAt:"2020-10-04T15:00:00.000Z", deletedAt: null},
    { id: '4', challengeId:"4", userId: "5", state: "active", solutionRepository:"https://github.com/suvelocity/DragAndScaleBoilerplate", createdAt:"2020-10-04T13:30:00.000Z", deletedAt: null},
    { id: '5', challengeId:"5", userId: "6", state: "active", solutionRepository:"https://github.com/suvelocity/calculator-challenge", createdAt:"2020-10-04T18:50:00.000Z", deletedAt: null},
    { id: '6', challengeId:"6", userId: "1", state: "active", solutionRepository:"https://github.com/suvelocity/Chat-App-Template", createdAt:"2020-10-04T13:00:00.000Z", deletedAt: null}
  ]

  
export default function ComboBox() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={challenges}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}