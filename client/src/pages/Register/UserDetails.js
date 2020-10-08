import React from 'react'

function UserDetails({ nextStep, handleChange, values }) {
  return (
    <div>
      <input id='firstName' type='text' value={values.firstName} placeholder='Enter First Name' onChange={handleChange('firstName')} /> <br />
      <input id="lastName" type='text' value={values.lastName} placeholder='Enter Last Name' onChange={handleChange('lastName')} /> <br />
      <input id='username' type='text' value={values.userName} placeholder='Enter Username' onChange={handleChange('userName')} /> <br />
      <input id="email" type='email' value={values.email} placeholder='Enter Email' onChange={handleChange('email')} /> <br />
      <button id="nextStep" onClick={nextStep}>Next</button>
    </div>
  )
}

export default UserDetails
