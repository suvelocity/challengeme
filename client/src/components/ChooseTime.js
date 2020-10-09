import React, { useEffect, useState } from 'react';

const ChooseTime =({ formerSelection , submitFilter }) => {
  const [selected,setSelected]  = useState(100)
  
  const selectionChange = (e)=>{
    const {value} = e.target
    setSelected(value)
    submitFilter('time',value)
  }

  return (
    // <div className='filter'>
    //     {"choose labels:"}
    <div className='timeFilter'>
    <span>Time Range: {selected} </span><br />
    <input defaultValue='100' type='range' onChange={selectionChange} />
    </div>
    //   {/* <button onClick={submit}>confirm</button> 
    // </div> */}
  );
}
export default ChooseTime 