import React, { useEffect, useState } from 'react';
import network from '../services/network';
import Selector from 'react-select'

const ChooseCategory =({ formerSelection , submitFilter }) => {
  const [labels,setLabels]  = useState([])
  
  useEffect(// gets existing labels
    ()=>{
      (
        ()=>{
          network.get(`/api/v1/labels`)
          .then(({data})=>{
            setLabels(data)
          })  
        }
      )()
    }
    ,[])
  
  const selectionChange = (allSelected,lastAction)=>{// this 
    // allSelected=[{title:<string>,value:<string>},{title:<string>,value:<string>}]
    // lastAction={action:<string>, option(what you clicked): {title:<string>,value:<string>} , name(name of the Selector):<string>}
    submitFilter('labels',allSelected?allSelected.map(selection=>selection.value):[])
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