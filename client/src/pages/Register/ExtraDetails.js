import React, { useState } from 'react'

function ExtraDetails({values, handleChange, prevStep, nextStep}) {
  return (
    <div>
      <select defaultValue={values.signUpReason} name={values.signUpReason} onChange={handleChange('signUpReason')}> 
        <option disabled value={values.signUpReason}>Choose your sign-up reason...</option>
        <option value='Student' >Student</option>
        <option value='Challenge Myself'>Challenge Myself</option>
        <option value='Other'>Other</option>
      </select><br />
      <input type='text' value={values.gitHub} placeholder='Enter your GitHub Account Username' onChange={handleChange('gitHub')}/> <br />
      <select defaultValue={values.securityQuestion} name={values.securityQuestion} placeholder='Enter security question' onChange={handleChange('securityQuestion')} >
        <option disabled value={values.securityQuestion}>Choose Security Question...</option>
        <option value='Q1'>Q 1</option>
        <option value='Q2'>Q 2</option>
        <option value='Q3'>Q 3</option>
        <option value='Q4'>Q 4</option>
        <option value='Q5'>Q 5</option>
      </select><br />
      <input type='text' value={values.securityAnswer} placeholder='Enter your answer' onChange={handleChange('securityAnswer')} /> <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  )
}

export default ExtraDetails
