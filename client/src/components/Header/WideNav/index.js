import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Link, NavLink, useHistory, useLocation,
} from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Cube from '../../../images/Cube';
import ChallengeMeSmallTitle from '../../../images/ChallengeMeSmallTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Divider from '@material-ui/core/Divider';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './WideNavStyle';
import network from '../../../services/network';
import { Logged } from '../../../context/LoggedInContext';
import Search from '../Search';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export default function WideNav({ darkMode, setDarkMode }) {
  const classes = useStyles();
  const location = useHistory();
  const LoggedContext = useContext(Logged);
  const currentLocation = useLocation();

  const [openNavBar, setOpenNavBar] = useState(false);


  const handleDrawerOpen = () => {
    setOpenNavBar(true);
  };

  const handleDrawerClose = () => {
    setOpenNavBar(false);
  };

  const logOut = async () => {
    try {
      await network.post('/api/v1/auth/logout', {
        token: Cookies.get('refreshToken'),
      });
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
      ;
      Cookies.remove('userId');
      Cookies.remove('userName');
      LoggedContext.setLogged(false);
      LoggedContext.setIsAdmin(false);
      location.push('/');
      handleDrawerClose()
    } catch (error) {
    }
  };

  const headerStyle = {
    backgroundColor: darkMode ? 'rgb(51,51,51)' : 'transport',
  };
  const letterColor = {
    color: darkMode ? 'white' : 'white',
  };
  const drawerColor = {
    color: darkMode ? 'white' : 'black',
  };
  const dividerColor = darkMode
    ? {
      backgroundColor: 'rgba(255,255,255,0.3)',
    }
    : {};
  return (
    <>
      <AppBar position="fixed" className={clsx(classes.appBarRegolar)} style={headerStyle}>
        <Toolbar>
          <Typography variant="h6" >
            <NavLink to="/" exact className="link-rout">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px',
                }}
              >
                <Cube style={letterColor} />
                <ChallengeMeSmallTitle />
              </div>
            </NavLink>
          </Typography>
          <div className={classes.middleFlex}>
            {currentLocation.pathname === '/' &&
              <Typography variant="h6" className={classes.title}>
                <Link to={LoggedContext.logged ? "/teams" : currentLocation.pathname} className="link-rout">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px',
                      marginLeft: '40px',
                    }}
                  >
                    <GroupIcon style={letterColor} />
                &nbsp;
                <span style={letterColor} className="header-link-title">
                      Teams
                </span>
                  </div>
                </Link>
              </Typography>
            }
            {currentLocation.pathname === '/challenges' && (
              <Search darkMode={darkMode} setDarkMode={setDarkMode} />
            )}
          </div>
          <div style={{ flex: 1 }} />
          {/* {currentLocation.pathname !== '/' ?
            (<IconButton
              aria-label="delete"
              onClick={() => {
                localStorage.setItem('darkMode', !darkMode);
                setDarkMode((prev) => !prev);
              }}
            >
              {darkMode ? (
                <Brightness7Icon style={letterColor} />
              ) : (
                  <Brightness4Icon style={letterColor} />)}
            </IconButton>)
            : null} */}

          {LoggedContext.logged && Cookies.get('userName') ?
            <Tooltip title={Cookies.get('userName')}>
              {/* <Link to="/profile/info" className="link-rout"> */}
              <Avatar
                onClick={handleDrawerOpen}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                style={{
                  cursor: 'pointer',
                  backgroundColor: darkMode ? 'rgb(140,110,99)' : '#7BACB4',
                }}
              >
                {Cookies.get('userName').slice(0, 2)}
              </Avatar>
              {/* </Link> */}
            </Tooltip> :
            <>
              <Link to="/login" className="link-rout">
                <Button variant="contained" className={darkMode ? classes.filterButtonDark : classes.filterButton}>
                  Login
                  </Button>
              </Link>
              <Link to="/register" className="link-rout">
                <Button variant="contained" className={darkMode ? classes.filterButtonDark : classes.filterButton}>
                  Register
                  </Button>
              </Link>
            </>}
        </Toolbar>
      </AppBar>

      <StyledMenu
        id="customized-menu"
        anchorEl={openNavBar}
        keepMounted
        open={Boolean(openNavBar)}
        onClose={handleDrawerClose}
        className={classes.menu}
      >
        <div className={`${classes.drawerHeader} ${classes.flexRow}`}>
          <b>
            {LoggedContext.logged && Cookies.get('userName') ? (`Hey ${Cookies.get('userName')}`) : 'Welcome to ChallengeMe'}
          </b>
          <IconButton onClick={handleDrawerClose}>
            <ExpandLessIcon style={drawerColor} />
          </IconButton>
        </div>
        <Divider variant="middle" style={dividerColor} />
        <List className={classes.list}>
          {currentLocation.pathname === '/challenges' ?
            <Link to="/" className="link-rout">
              <ListItem className={classes.flexRow} button onClick={handleDrawerClose} style={drawerColor}>
                <ListItemText primary="Home" />
                <ListItemIcon className={classes.flexEnd}>
                  <Cube style={drawerColor} />
                </ListItemIcon>
              </ListItem>
            </Link> :
            <Link to="/challenges" className="link-rout">
              <ListItem className={classes.flexRow} button onClick={handleDrawerClose} style={drawerColor}>
                <ListItemText primary="Challenges" />
                <ListItemIcon className={classes.flexEnd}>
                  <Cube style={drawerColor} />
                </ListItemIcon>
              </ListItem>
            </Link>}
          <Divider variant="middle" style={dividerColor} />
          <Link to="/profile/info" className="link-rout">
            <ListItem className={classes.flexRow} button onClick={handleDrawerClose} style={drawerColor}>
              <ListItemText primary="Profile" />
              <ListItemIcon className={classes.flexEnd}>
                <AccountCircleIcon style={drawerColor} />
              </ListItemIcon>
            </ListItem>
          </Link>
          {LoggedContext.isAdmin && (
            <>
              <Divider variant="middle" style={dividerColor} />
              <Link to="/admin/DashBoard" className="link-rout">
                <ListItem className={classes.flexRow} button onClick={handleDrawerClose} style={drawerColor}>
                  <ListItemText primary="Admin Area" />
                  <ListItemIcon className={classes.flexEnd}>
                    <LockIcon style={drawerColor} />
                  </ListItemIcon>
                </ListItem>
              </Link>
            </>
          )}
          <Divider variant="middle" style={dividerColor} />
          <Link to="/addnewchallenge" className="link-rout">
            <ListItem className={classes.flexRow} button onClick={handleDrawerClose}>
              <ListItemText primary="Add New Challenge" />
              <ListItemIcon className={classes.flexEnd} >
                <AddIcon style={drawerColor} />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Divider variant="middle" style={dividerColor} />
          {LoggedContext.logged ?
            <ListItem button className={classes.flexRow} onClick={logOut}>
              <ListItemText style={{ color: '#C10000' }} primary="Logout" />
              <ListItemIcon className={classes.flexEnd}>
                <ExitToAppIcon style={{ color: '#C10000' }} />
              </ListItemIcon>
            </ListItem> : null}
        </List>
      </StyledMenu>
    </>
  );
}
