import React, { useState } from 'react';

const ChooseTime =({ submitFilter }) => {
  const [selected,setSelected]  = useState(100)
  
  const selectionChange = (e)=>{
    const {value} = e.target
    setSelected(value)
    submitFilter('time',value)
  }

  return (
    <div className='timeFilter'>
    <span>Time Range: {selected} </span><br />
    <input defaultValue='100' type='range' onChange={selectionChange} />
    </div>
  );
}
export default ChooseTime 