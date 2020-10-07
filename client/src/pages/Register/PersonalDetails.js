import React from 'react'

function PersonalDetails({values, handleChange, prevStep, nextStep}) {
  return (
    <div>
      <label>Enter Birth Date</label>
      <input type='date' value={values.birthDate} onChange={handleChange('birthDate')} /> <br />
      <input type='text' value={values.country} placeholder='Enter Country' onChange={handleChange('country')}/> <br />
      <input type='text' value={values.city} placeholder='Enter City' onChange={handleChange('city')} /> <br />
      <input type='text' value={values.phoneNumber} placeholder='Enter Phone Number' onChange={handleChange('phoneNumber')} /> <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  )
} 
export default PersonalDetails
