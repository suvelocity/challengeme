import React from 'react';
import './Submission.css';

function Submission({ bold, name, status, submittedAt }) {
  return (
    <div className='submission'>
      {bold ? (
        <div className='name'>
          <strong>{name}</strong>
        </div>
      ) : (
        <div className='name'>{name}</div>
      )}
      {bold ? (
        <div className='status'>
          <strong>{status}</strong>
        </div>
      ) : (
        <div className='status'>{status}</div>
      )}
      {bold ? (
        <div className='submittedAt'>
          <strong>{submittedAt}</strong>
        </div>
      ) : (
        <div className='submittedAt'>{submittedAt}</div>
      )}
    </div>
  );
}

export default Submission;
