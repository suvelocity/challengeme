import React, { useEffect, useState } from 'react';
import network from '../../services/network';
import Selector from 'react-select'

const ChooseLabels =({ submitFilter }) => {
  const [labels,setLabels]  = useState([])
  
  useEffect(// gets existing labels
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
  
  const selectionChange = (a)=>{
      // allSelected=[{title:<string>,value:<string>},{title:<string>,value:<string>}]
    // lastAction={action:<string>, option(what you clicked): {title:<string>,value:<string>} , name(name of the Selector):<string>}
    submitFilter(a?a.map(x=>x.value):[])
  }

  return (
    <div className='labelFilter'>
    <Selector
    className='selectLabels'
    maxMenuHeight={100}
    placeholder='select labels' 
    isMulti
    name='labels'
    onChange={selectionChange}
    closeMenuOnSelect={false}
    options={labels}/>

    </div>
  );
}

export default ChooseLabels 
