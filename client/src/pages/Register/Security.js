import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Security({values, handleChange, prevStep, nextStep}) {
  return (
    <div>
      <input type='password' value={values.password} placeholder='Enter Password' onChange={handleChange('password')} /> <br />
      <input type='password' value={values.confirmPassword} placeholder='Confirm Password' onChange={handleChange('confirmPassword')} /> <br />
      <Select displayEmpty value={values.securityQuestion} onChange={handleChange('securityQuestion')} >
        <MenuItem value="" disabled>Choose Security Question...</MenuItem>
        <MenuItem value='Q1'>Q 1</MenuItem>
        <MenuItem value='Q2'>Q 2</MenuItem>
        <MenuItem value='Q3'>Q 3</MenuItem>
        <MenuItem value='Q4'>Q 4</MenuItem>
        <MenuItem value='Q5'>Q 5</MenuItem>
      </Select><br />
      <input type='text' value={values.securityAnswer} placeholder='Enter your answer' onChange={handleChange('securityAnswer')} /> <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  )
}

export default Security
