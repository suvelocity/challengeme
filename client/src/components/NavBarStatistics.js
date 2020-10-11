import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton }  from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

import './statistics.css'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ComboBox from './ComboBox'
import SearchIcon from '@material-ui/icons/Search';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import { Link } from "react-router-dom"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
const drawerWidth = 300;


const routesIcons = [
  {name: "UserStatistics", iconComp: <ContactMailOutlinedIcon />, text: "User Statistics", path: "/statistics/users"},
  {name: "TeamStatistics", iconComp: <GroupOutlinedIcon />, text: "Team Statistics", path: "/statistics/teams"},
  {name: "Insights", iconComp: <InsertChartOutlinedIcon />, text: "Insights Statistics", path: "/statistics/insights"},
  {name: "ChallengeCard", iconComp: <AssistantOutlinedIcon />, text: "Challenge Card Statistics", path: "/statistics/challenge-card"},
  {name: "ProfileStatistics", iconComp: <AssignmentIndOutlinedIcon />, text: "Profile Statistics", path: "/statistics/profile"},
]





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    marginTop: "3.4rem"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function NavBarStatistics() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>


        {!open ? <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <SearchIcon />
          </IconButton> : <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <ComboBox />
          </div>
        }
        </div>
    
        <Divider />
        {<br />}
        <List >
          {routesIcons.map((route) => (
            <Link to={route.path}>

            <ListItem button key={route.text} >
            
              <ListItemIcon id={route.name} onClick={handleDrawerClose}> 
                  {route.iconComp}
              </ListItemIcon>

                <ListItemText primary={route.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
    
        <Link id="home" to="/statistics">
          <ListItem button key="Home Statistics">
          <ListItemIcon onClick={handleDrawerClose}>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home Statistics" />
        </ListItem>
        </Link>
        </List>
      </Drawer>
    </div>
  );
}
