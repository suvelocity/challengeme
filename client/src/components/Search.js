import React, { useEffect, useState } from 'react';
import  ChooseCategory from "./ChooseCategory"
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
  const [openFilter,setOpenFilter]  = useState(false)
  const [results,setResults]  = useState([])
  const [filters,setFilters]  = useState({categories:[]})

  const search= (e) => {
    let {value} = e.target
    if(!value.length){return setResults([])}
    if(value==='*'){ value =''}
    try{
      console.log(`${filters.categories.join(',')}`)
      network.get(`/api/v1/challenges?challengeName=${value}&categories=${filters.categories.join(',')}`)
      .then(({data})=>{
        setResults(data)
      })
    }catch(error){
      console.error(error)
    }
  }
  const closeSearch= () => {
    setResults([])
    setSearching(false)
  }
  const exitSearch = (e) => {
    const {key,target} = e
    if(!target.value.length){
      if(key==='Escape'){
        closeSearch()
        target.blur()
      }
    }
  }
  const resultsList = (results&&results.length>0
    ?results.map((results)=>{
      return <div key={results.name}>{results.name}</div>
    })
    :'no results found')
  
    const addFilters = (name,newFilter) => {
      const updated= {...filters}
      updated[name] = newFilter
      console.log(updated)
      setOpenFilter(false)
      setFilters(updated)
    }
  const searchInput = <div 
  className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      id={'searchBar'}
      placeholder={searching?'press esc to close':'Search'}
      onFocus={()=>{setSearching(true)}}
      onChange={search}
      onKeyUp={exitSearch}
      autoComplete='off'
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
        <div>
        {openFilter
          ?<ChooseCategory formerSelection={filters.categories}updateFilters={addFilters}/>
          :<button onClick={() => {setOpenFilter(true)}}>
            Choose Category 
          </button>}
        </div>
        {/* <button onClick={closeSearch} >[X]</button> */}
        {resultsList}
      </div>
    </div>
  );
}
export default Search 