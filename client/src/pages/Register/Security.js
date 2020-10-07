import React from 'react'

function Security({values, handleChange, prevStep, nextStep}) {
  return (
    <div>
      <input type='password' value={values.password} placeholder='Enter Password' onChange={handleChange('password')} /> <br />
      <input type='password' value={values.confirmPassword} placeholder='Confirm Password' onChange={handleChange('confirmPassword')} /> <br />
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

export default Security
