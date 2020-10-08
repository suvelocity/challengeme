import React, { useEffect, useState } from 'react';
import network from '../services/network';
import Selector from 'react-select'
const ChooseCategory =({ formerSelection , submitFilter }) => {
  const [labels,setLabels]  = useState([])
  const [selected,setSelected]  = useState()
  function getLabels(){
    network.get(`/api/v1/challenges/labels`)
    .then(({data})=>{
      console.log(data)
      setLabels(data)
    })  
  }
  useEffect(getLabels,[])
  
  const selectionChange = (a,b)=>{
    // a=[{title:<string>,value:<string>},{title:<string>,value:<string>}]
    // b={action:<string>, option(what you clicked): {title:<string>,value:<string>} , name(name of the Selector):<string>}
    console.log(a,b)
    submitFilter('labels',a.map(x=>x.value))
  }

  const submit= () => {
    // updateFilters('categories',selected)
  }
  return (
    // <div className='filter'>
    //   <div className='labels'>
    //     {"choose labels:"}
    <Selector 
    isMulti
    name='labels'
    onChange={selectionChange}
    options={labels}/>
    //   {/* <button onClick={submit}>confirm</button> 
    //   </div>
    // </div> */}
  );
}
export default ChooseCategory 