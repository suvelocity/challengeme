import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import { blueGrey } from "@material-ui/core/colors";
import "./SearchTicket.css";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },
}));

const avatarName = "test";
const dividerColor = {};
const letterColor = {
  color: "black",
};

function SearchTicket({ ticket, closeSearch }) {
  const rating = ticket.averageRaiting;
  const classes = useStyles();

  return (
    <Link to={`/challenges/${ticket.id}`} style={{ textDecoration: "none" }}>
      <div className="SearchTicket" style={letterColor} onClick={closeSearch}>
        <Avatar className={classes.blueGrey}>{avatarName}</Avatar>
        <div className="ticketName">{ticket.name}</div>
        <div className="ticketRating">
          <Rating name=" " value={+rating} style={{ opacity: 1.5 }} disabled />
        </div>
      </div>
      <Divider style={dividerColor} />
    </Link>
  );
}

export default SearchTicket;
