import React from 'react'

function UserDetails({ nextStep, handleChange, values}) {
  return (
    <div>
      <input type='text' value={values.firstName} placeholder='Enter First Name' onChange={handleChange('firstName')} /> <br />
      <input type='text' value={values.lastName} placeholder='Enter Last Name' onChange={handleChange('lastName')}/> <br />
      <input type='text' value={values.userName} placeholder='Enter Username' onChange={handleChange('userName')} /> <br />
      <input type='email' value={values.email} placeholder='Enter Email' onChange={handleChange('email')} /> <br />
      <button onClick={nextStep}>Next</button>
    </div>
  )
}

export default UserDetails
