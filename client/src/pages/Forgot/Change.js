import React from 'react';

export default function Change({ prevStep, newPassword, handleChange }) {
    return (
        <div>
            <input type='password' value={newPassword} onChange={handleChange('newPassword')} placeholder='Enter New Password' /> <br />
            <input type='password' placeholder='Confirm Password' /> <br />
            <button onClick={prevStep}>Back</button>
            <button>Change Password</button>
        </div>
    )
}