import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import network from '../../services/network';
import ChooseEvents from '../Choosers/ChooseEvents';

function getModalStyle() {
  const top = '15vh';
  const left = '28vw';

  return {
    top: `${top}`,
    left: `${left}`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '40vw',
    height: '60vh',
    maxHeight: '400px',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    width: '100%',
  },
}));

export default function AddWebhookTeam({ open = false, setOpen, getAllTeams }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [teamId, setTeamId] = useState();
  const [webhookUrl, setWebhookUrl] = useState();
  const [authorizationToken, setAuthorizationToken] = useState();
  const [eventsOptions, setEventsOptions] = useState([]);
  const [events, setEvents] = useState([]);

  const handleSubmitNewWebhookTeam = async () => {
    try {
      await network.post('/api/v1/webhooks/admin/teams', {
        teamId,
        webhookUrl,
        authorizationToken,
        events: events.map((event) => event.label),
      });
      getAllTeams();
      setOpen(false);
    } catch (error) { }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <div id="simple-modal-description">
        <Input
          className={classes.input}
          onChange={(event) => setTeamId(event.target.value)}
          placeholder="Insert Team ID Name..."
        />
        <br />
        {' '}
        <br />
        <Input
          className={classes.input}
          onChange={(event) => setWebhookUrl(event.target.value)}
          placeholder="Insert Webhook Url Name..."
        />
        {' '}
        <br />
        {' '}
        <br />
        <Input
          className={classes.input}
          onChange={(event) => setAuthorizationToken(event.target.value)}
          placeholder="Insert Authorization Token ..."
        />
        {' '}
      </div>
      <ChooseEvents
        chooseEvents={events}
        setChooseEvents={setEvents}
        eventsOptions={eventsOptions}
        setEventsOptions={setEventsOptions}
      />
      <br />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitNewWebhookTeam}
      >
        Add New Webhook Team
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
