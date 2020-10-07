import React, { useEffect, useState } from 'react';
import  ChallengeCard from "./ChallengeCard"
import { fade ,makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import network from '../services/network';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 600,
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: '37.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search =() => {
  const classes = useStyles();
  const [searching,setSearching]  = useState(false)
  const [results,setResults]  = useState([])
  const [query, setQuery] = useState('')
  
  const Search= (e) => {
    const {value} = e.target
    if(value.length === 0){
      setSearching(false)
      setResults([])
      return
    }
    setSearching(true)
    try{
      network.get(`/api/v1/challenges?challengeName=${value}`)
      .then(({data})=>{
        setResults(data)
      })
    }catch(error){

    }
  }
  const closeSearch= () => {
    setResults([])
    setSearching(false)
  }

const searchInput = <div 
className={classes.search}>
<div className={classes.searchIcon}>
  <SearchIcon />
</div>
  <InputBase
  id={'searchBar'}
  onChange={Search}
  placeholder="Search…"
  classes={{
    root: classes.inputRoot,
    input: classes.inputInput,
  }}
  inputProps={{ 'aria-label': 'search' }}
  />
</div>

  return (
    <div id='search'>
      {searchInput}
      <div id='searchResults' className={searching?'open':'closed'}>
        <button onClick={closeSearch} >close</button>
        {results.map((results)=>{
          return <div key={results.name}>{results.name}</div>
        })}
      </div>
    </div>
  );
}
export default Search 