import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'

function Confirm({ prevStep, values, handleSubmit }) {
  return (
    <div>
      <List >
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="First Name" secondary={values.firstName} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Last Name" secondary={values.lastName} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="User Name" secondary={values.userName} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Email" secondary={values.email} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Birth Date" secondary={values.birthDate} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Country" secondary={values.country} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="City" secondary={values.city} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Phone Number" secondary={values.phoneNumber} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Sign Up Reason" secondary={values.signUpReason} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="GitHub Account" secondary={values.gitHub} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Security Question" secondary={values.securityQuestion} />
        </ListItem>
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary="Security Answer" secondary={values.securityAnswer} />
        </ListItem>
      </List>
      <button onClick={prevStep}>Back</button>
      <button onClick={handleSubmit} >Confirm</button>

    </div>
  )
}

export default Confirm
