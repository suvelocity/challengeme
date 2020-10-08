import React from 'react'

function PersonalDetails({ values, handleChange, prevStep, nextStep }) {
  return (
    <div>
      <input id="country" type='text' value={values.country} placeholder='Enter Country' onChange={handleChange('country')} /> <br />
      <input id="city" type='text' value={values.city} placeholder='Enter City' onChange={handleChange('city')} /> <br />
      <label>Enter Birth Date</label>
      <input id="date" type='date' value={values.birthDate} onChange={handleChange('birthDate')} /> <br />
      <input id="phone" type='text' value={values.phoneNumber} placeholder='Enter Phone Number' onChange={handleChange('phoneNumber')} /> <br />
      <button onClick={prevStep}>Back</button>
      <button id="nextStep" onClick={nextStep}>Next</button>
    </div>
  )
}
export default PersonalDetails
