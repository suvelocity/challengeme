import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Security({ nextStep, securityAnswer, handleChange, securityQuestion }) {
    return (
        <div>
            <Select displayEmpty value={securityQuestion} onChange={handleChange('securityQuestion')}>
                <MenuItem value="" disabled>Choose Security Question...</MenuItem>
                <MenuItem value='Q1'>Q 1</MenuItem>
                <MenuItem value='Q2'>Q 2</MenuItem>
                <MenuItem value='Q3'>Q 3</MenuItem>
                <MenuItem value='Q4'>Q 4</MenuItem>
                <MenuItem value='Q5'>Q 5</MenuItem>
            </Select><br />
            <input type='text' placeholder='Enter your answer' value={securityAnswer} onChange={handleChange('answer')} /> <br />
            <button onClick={nextStep}>Next</button>
        </div>
    )
}

export default Security