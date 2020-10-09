import React, { useEffect, useState } from 'react';
import ChooseLabels from './ChooseLabels'
import ChooseTime from './ChooseTime'
import ChooseCategory from './ChooseCategory'
import './FilterMenu.css'

const FilterMenu =( {formerSelection,updateFilters}) => {
  //filters must have a value that's either a number/string or an array of such
  const {labels:formerLabels,time:formerTime} = formerSelection
  const [labels,setLabels]  =useState(formerLabels||[])
  const [time,setTime]  = useState(formerTime||100)
  const [open,setOpen]  = useState(false)
  const submit= () => {
    updateFilters({labels,time})
    setOpen(false);
  }
  const clear= () => {
    updateFilters({labels:[],time:100})
    setOpen(false);
  }
  const close= () => {
    setOpen(false);
  }
  
  const toggleOpenClick = () => {
    if(open){
      close()
    }else{
      setOpen(true)
    }
    
  }

  const menuClass = open?'open filters':'filters'
  
  return (
    <div className='filterMenu'>
      <div className={menuClass}>
      <h3>
      FILTERS
      </h3>
        {/* <ChooseCategory submitFilter={setValue} /> */}
        
        <button 
          className='filterSubmit' 
          onClick={submit} >
          submit
        </button>
        
        <button 
          className='filterClear' 
          onClick={clear} >
          clear
        </button>
        
        <button 
          className='filterCancel' 
          onClick={close} >
          cancel
        </button>
        
        <ChooseLabels submitFilter={setLabels} />
        <ChooseTime submitFilter={setTime} />
      
      </div>
      <div className='toggleOpen' 
      onClick={toggleOpenClick} />
    </div>
    );
}
export default FilterMenu 