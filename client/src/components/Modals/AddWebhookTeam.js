import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import network from "../../services/network";
import ArrayForm from "../arrayForm";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddAccessKey({ open = false, setOpen, getAllTeams }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [teamId, setTeamId] = useState();
  const [webhookUrl, setWebhookUrl] = useState();
  const [authorizationToken, setAuthorizationToken] = useState();
  const [events, setEvents] = useState([]);

  const handleSubmitNewAccessKey = async () => {
    try {
      await network.post("/api/v1/webhooks/admin/teams", {
        teamId,
        webhookUrl,
        authorizationToken,
        events,
      });
      getAllTeams();
      setOpen(false);
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <div id="simple-modal-description">
        <Input
          onChange={(event) => setTeamId(event.target.value)}
          placeholder="Insert Team ID Name..."
        />
        <br /> <br />
        <Input
          onChange={(event) => setWebhookUrl(event.target.value)}
          placeholder="Insert Webhook Url Name..."
        />{" "}
        <br /> <br />
        <Input
          onChange={(event) => setAuthorizationToken(event.target.value)}
          placeholder="Insert Authorization Token ..."
        />{" "}
      </div>
      <ArrayForm data={events} setData={setEvents} name="Events" />
      <br />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitNewAccessKey}
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
