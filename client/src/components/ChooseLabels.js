import React, { useEffect, useState } from 'react';
import network from '../services/network';
import Selector from 'react-select'

const ChooseCategory =({ formerSelection , submitFilter , addNewChallengeLabelsSetter}) => {
  const [labels,setLabels]  = useState([])
  const [selected,setSelected]  = useState()
  useEffect(
    ()=>{
      (
        ()=>{
          network.get(`/api/v1/challenges/labels`)
          .then(({data})=>{
            setLabels(data)
          })  
        }
      )()
    }
    ,[])
  
  const selectionChange = (a,b)=>{
    // a=[{title:<string>,value:<string>},{title:<string>,value:<string>}]
    // b={action:<string>, option(what you clicked): {title:<string>,value:<string>} , name(name of the Selector):<string>}
    if(addNewChallengeLabelsSetter){
      addNewChallengeLabelsSetter(a?a.map(x=>x.value):[])
    }
    submitFilter('labels',a?a.map(x=>x.value):[])
  }

  return (
    // <div className='filter'>
    //     {"choose labels:"}
    <div className='labelFilter'>
    <Selector
    placeholder='select labels' 
    isMulti
    name='labels'
    onChange={selectionChange}
    options={labels}/>
    </div>
    //   {/* <button onClick={submit}>confirm</button> 
    // </div> */}
  );
}
export default ChooseCategory 