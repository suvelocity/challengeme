/* eslint-disable no-use-before-define */
import React from 'react';
import matchSorter from 'match-sorter';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const challenges = [
    { id: '1', title: "Sequelize Challenge" , challengeId:"1", userId: "2", state: "active", solutionRepository:"https://github.com/RoyShnitzel/challenge-sequelize", createdAt:"2020-10-04T13:30:00.000Z", deletedAt: null},
    { id: '2', title: "Authentication Challenge", challengeId:"2", userId: "4", state: "active", solutionRepository:"https://github.com/suvelocity/Authentication-Challenge-TEMPLATE", createdAt:"2020-10-04T13:40:00.000Z", deletedAt: null},
    { id: '3', title: "corona-pandemic-manager", challengeId:"3", userId: "3", state: "active", solutionRepository:"https://github.com/suvelocity/corona-pandemic-manager", createdAt:"2020-10-04T15:00:00.000Z", deletedAt: null},
    { id: '4', title: "Authentication-Challenge-TEMPLATE", challengeId:"4", userId: "5", state: "active", solutionRepository:"https://github.com/suvelocity/DragAndScaleBoilerplate", createdAt:"2020-10-04T13:30:00.000Z", deletedAt: null},
    { id: '5', title: "challenge-sequelize", challengeId:"5", userId: "6", state: "active", solutionRepository:"https://github.com/suvelocity/calculator-challenge", createdAt:"2020-10-04T18:50:00.000Z", deletedAt: null},
    { id: '6', title: "challenge-sequelize", challengeId:"6", userId: "1", state: "active", solutionRepository:"https://github.com/suvelocity/Chat-App-Template", createdAt:"2020-10-04T13:00:00.000Z", deletedAt: null}
  ]

//   id 
//   title
//   challengeId
//   userId
//   state
//   solutionRepository
//   createdAt
//   deletedAt



export default function ComboBox() {
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: challenges => challenges.title,
      });

  return (
    <Autocomplete
      id="combo-box-demo"
      options={challenges}
      getOptionLabel={(challenges) => challenges.title}
      filterOptions={filterOptions}
      style={{ width: 240 }}
      renderInput={(params) => <TextField {...params} label="Search Challenge" variant="outlined" />}
    />
  );
}