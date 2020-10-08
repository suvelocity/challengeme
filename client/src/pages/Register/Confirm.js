import React from 'react'

function Confirm({ email }) {
  return (
    <div>
      <h1 style={{marginTop: 100}}>Please Confirm Your Account <br /> On The Confirmation Link Sent <br /> To This Email: <br /> {email}</h1>
    </div>
  )
}

export default Confirm
