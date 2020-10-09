import React, { useEffect, useState } from 'react';
import ChooseLabels from './ChooseLabels'
import ChooseTime from './ChooseTime'
import ChooseCategory from './ChooseCategory'
const FilterMenu =( {formerSelection,updateFilters}) => {

  const [filters,setFilters]  = useState(formerSelection||[])
  const [open,setOpen]  = useState(false)
console.log(open)
  const setValue = (name,value) => {
    const updated= {...filters}
    updated[name] = value
    console.log(updated)
    // setOpenFilter(false)
    console.log(updated)
    setFilters(updated)
  }

  const buttonClick = () => {
    if(open){
      setOpen(false);
      submit()  
    }else{
      setOpen(true)
    }
    
  }

  const submit= () => {
    updateFilters(filters)
  }
  const menuClass = open?'open filters':'filters'
  
  return (
    <div className='filterMenu'>
      <div className={menuClass}>
      <h3>
      FILTERS
      </h3>
        {/* <ChooseCategory submitFilter={setValue} /> */}
        <ChooseLabels submitFilter={setValue} />
        <ChooseTime submitFilter={setValue} />
      </div>
      <div className='Button' 
      onClick={buttonClick} />

    </div>
    );
}
export default FilterMenu 