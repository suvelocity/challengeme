import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'

function Confirm({ prevStep, values }) {
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
      </List>
      <button onClick={prevStep}>Back</button>
      <button onClick={() => {alert(`welcome ${values.userName}`)}} >Confirm</button>

    </div>
  )
}

export default Confirm
