import React, { useEffect, useState } from 'react';
import  ChallengeCard from "./ChallengeCard"
import network from '../services/network';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // maxWidth: 600,
//     marginBottom: 20,
//   },
//   media: {
//     height: 0,
//     paddingTop: '37.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

const Search =() => {
  // const classes = useStyles();
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
  return (
    <div id='search'>
      <input id='searchBar' onInput={Search} />
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