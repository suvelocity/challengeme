import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import { blueGrey  } from '@material-ui/core/colors';
import './SearchTicket.css'

const useStyles = makeStyles((theme) => ({
    blueGrey: {
      color: theme.palette.getContrastText(blueGrey[500]),
      backgroundColor: blueGrey[500],
    }
  }));

function SearchTicket({ ticket, closeSearch }) {
    const rating = ticket.rating || Math.random()*6 ;
    const classes = useStyles();
    const avatarName = ticket.repositoryName.substring(0,2).toUpperCase()


    return (
  <Link to={`/challenges/${ticket.id}`} style={{textDecoration: 'none'}}>
            <div className="SearchTicket" onClick={closeSearch}>
                <Avatar className={classes.blueGrey}>{avatarName}</Avatar>
                <div className="ticketName">{ticket.name}</div>
                <div className="ticketRating">
                    <Rating name="" value={rating} disabled />
                </div>
            </div>
        </Link>
    )
}

export default SearchTicket
