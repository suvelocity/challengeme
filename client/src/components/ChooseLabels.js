import React, { useEffect, useState } from 'react';
import network from '../services/network';
import Selector from 'react-select'
const ChooseCategory =({ formerSelection , updateFilters }) => {
  const [labels,setLabels]  = useState([])
  const [selected,setSelected]  = useState()
  function getLabels(){
    network.get(`/api/v1/challenges/labels`)
    .then(({data})=>{
      setLabels(data)
    })  
  }
  useEffect(getLabels,[])

  // const selectCategory= (e) => {
  //   const {target} = e 
  //   const {value,checked} = target
  //   console.log(checked)
  //   if(checked){
  //     const newSelection = [...selected]
  //     newSelection.push(value)
  //     console.log(newSelection)
  //     setSelected(newSelection)
  //   }else{
  //     const newSelection = [...selected]
  //     .filter(category=>category!==value)
  //     setSelected(newSelection)
  //   }
  // }
  // const selectAllCategories = (e)=>{
  //   const {checked} =e.target
  //   if(checked){
  //     setSelected(categories)
  //   }else{
  //     setSelected([])
  //   }
  // }
  const submit= () => {
    updateFilters('categories',selected)
  }
  return (
    // <div className='filter'>
    //   <div className='labels'>
    //     {"choose labels:"}
    <Selector 
    isMulti
    name='labels'
    
    options={labels.map(label=>{
       return { label,value:label.toLowerCase() 
      } 
    })}/>
    //   {/* <button onClick={submit}>confirm</button> 
    //   </div>
    // </div> */}
  );
}
export default ChooseCategory 