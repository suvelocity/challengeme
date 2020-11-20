import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
  },
}));

export default function HeaderProfile() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "60px" }}>
      <AppBar position="static" className={classes.root}>
        {/* <Toolbar> */}
        <ListItem button>
          <ListItemText primary="Profile Info" className={classes.text} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="My Challenges" className={classes.text} />
        </ListItem>
        {/* </Toolbar> */}
      </AppBar>
    </div>
  );
}
