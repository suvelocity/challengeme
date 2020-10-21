import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import pageNotFound from '../images/pageNotFound.png';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignContent: "center",
        textAlign: "center"
    },
    h3: {
        fontSize: "50px",
    },
    p: {
        fontSize: "30px",
    },
    goBack: {
        width: "200px",
        fontSize: "30px",
        margin: "auto",
        marginBottom: "15px",
        border: "none",
        background: "transparent",
        textDecoration: "underline",
        cursor: "pointer",
        
    },
    goHome: {
        width: "200px",
        fontSize: "30px",
        margin: "auto",
    },
}));
const NotFound = () => {
    const classes = useStyles();
    const location = useHistory()

    return (
        <div className={classes.container}>
            <h3 className={classes.h3}>404 page not found</h3>
            <p className={classes.p} >We are sorry but the page you are looking for does not exist.</p>
            <button className={classes.goBack} onClick={() => location.goBack()}>Go Back</button>
            <Link to='/'><div className={classes.goHome}>Go Home</div></Link>
            <img src={pageNotFound} alt=' ' />
        </div>
    )
}

export default NotFound;