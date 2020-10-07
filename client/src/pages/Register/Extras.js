import React from 'react'

function Extras({values, handleChange, prevStep, nextStep}) {
    return (
        <div>
            <select defaultValue={values.signUpReason} name={values.signUpReason} onChange={handleChange('signUpReason')}> 
                <option disabled value={values.signUpReason}>Choose your sign-up reason...</option>
                <option value='Student' >Student</option>
                <option value='Challenge Myself'>Challenge Myself</option>
                <option value='Other'>Other</option>
            </select><br />
            <input type='text' value={values.gitHub} placeholder='Enter your GitHub Account Username' onChange={handleChange('gitHub')}/> <br />
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    )
}

export default Extras
