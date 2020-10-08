import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Extras({values, handleChange, prevStep, nextStep}) {
    return (
        <div>
            <Select displayEmpty value={values.signUpReason} onChange={handleChange('signUpReason')}> 
                <MenuItem value="" disabled>Choose your sign-up reason...</MenuItem>
                <MenuItem value='Student' >Student</MenuItem>
                <MenuItem value='Challenge Myself'>Challenge Myself</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
            </Select><br />
            <input type='text' value={values.gitHub} placeholder='Enter your GitHub Account Username' onChange={handleChange('gitHub')}/> <br />
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    )
}

export default Extras
