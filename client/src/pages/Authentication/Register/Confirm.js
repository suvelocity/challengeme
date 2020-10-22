import React from 'react';

function Confirm({ email }) {
  return (
    <div>
      <div className="confirmMessage">
        Please Confirm Your Account
        <br />
        {' '}
        On The Confirmation Link Sent
        <br />
        {' '}
        To This Email:
        <br />
        {' '}
        <b>{email}</b>
      </div>
    </div>
  );
}

export default Confirm;
