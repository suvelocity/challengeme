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

function SearchTicket({ ticket, closeSearch, darkMode }) {
    const rating = ticket.rating || Math.random() * 6;
    const classes = useStyles();
    const avatarName = ticket.repositoryName.substring(0, 2).toUpperCase();

    const dividerColor = darkMode
        ? {
            backgroundColor: "rgba(255,255,255,0.3)",
        }
        : {};

    const letterColor = {
        color: darkMode ? "white" : "black",
    };
    return (
        <Link to={`/challenges/${ticket.id}`} style={{ textDecoration: "none" }}>
            <div className="SearchTicket" style={letterColor} onClick={closeSearch}>
                <Avatar className={classes.blueGrey}>{avatarName}</Avatar>
                <div className="ticketName">{ticket.name}</div>
                <div className="ticketRating">
                    <Rating name="" value={rating} style={{ opacity: 1.5 }} disabled />
                </div>
            </div>
            <Divider style={dividerColor} />
        </Link>
    );
}

export default SearchTicket;
