import React, { useEffect, useState } from 'react';
import network from '../../services/network';
import Selector from 'react-select'

const ChooseLabels =({ submitFilter }) => {
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
  
  const selectionChange = (a)=>{
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
