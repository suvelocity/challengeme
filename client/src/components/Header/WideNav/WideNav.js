import React, { useContext, useState, useEffect } from 'react';
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
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import '../Header.css';
import DarkModeToggle from 'react-dark-mode-toggle';
import Search from '../Search/Search';
import { Logged } from '../../../context/LoggedInContext';
import FilteredLabels from '../../../context/FilteredLabelsContext';
import network from '../../../services/network';
import ChooseLabels from '../../Choosers/ChooseLabels';
import useStyles from './WideNavStyle';

export default function WideNav({ darkMode, setDarkMode, isAdmin }) {
  const filteredLabels = useContext(FilteredLabels);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useHistory();
  const loggedContext = useContext(Logged);
  const [labels, setLabels] = useState([]);
  const [chooseLabels, setChooseLabels] = useState([]);
  const currentLocation = useLocation();

  useEffect(() => {
    if (currentLocation.pathname !== '/') {
      setLabels([]);
    } else {
      const newFilter = chooseLabels.filter(
        (label) => label.value
          === (filteredLabels ? filteredLabels.filteredLabels[0] : null),
      );
      setLabels(newFilter);
    }
    // eslint-disable-next-line
  }, [currentLocation]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    try {
      await network.post('/api/v1/auth/logout', {
        token: Cookies.get('refreshToken'),
      });
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      Cookies.remove("name");
      Cookies.remove("userId");
      Cookies.remove("isAdmin");
      Cookies.remove("userName");
      loggedContext.setLogged(false);
      location.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const headerStyle = {
    backgroundColor: darkMode ? 'rgb(51,51,51)' : 'white',
  };
  const letterColor = {
    color: darkMode ? 'white' : 'black',
  };
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBarRegolar)}
      style={headerStyle}
    >
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <NavLink to="/" exact className="link-rout">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
              }}
            >
              <HomeIcon style={letterColor} />
              &nbsp;
              <span style={letterColor} className="header-link-title">
                ChallengeMe
              </span>
            </div>
          </NavLink>
        </Typography>
        <Search darkMode={darkMode} setDarkMode={setDarkMode} />
        <div style={{ minWidth: '150px', width: 'fit-content' }}>
          {currentLocation.pathname === '/' ? (
            <ChooseLabels
              labels={labels}
              chooseLabels={chooseLabels}
              setChooseLabels={setChooseLabels}
              darkMode={darkMode}
              setLabels={setLabels}
            />
          ) : null}
        </div>
        {currentLocation.pathname === '/' ? (
          <Button
            onClick={() => {
              filteredLabels.setFilteredLabels(
                labels ? labels.map((label) => label.value) : [],
              );
            }}
            variant="contained"
            className={
              darkMode ? classes.filterButtonDark : classes.filterButton
            }
          >
            filter
          </Button>
        ) : null}
        <div style={{ flex: 1 }} />
        <DarkModeToggle
          className={classes.darkModeToggle}
          checked={darkMode}
          onChange={() => {
            localStorage.setItem('darkMode', !darkMode);
            setDarkMode((prev) => !prev);
          }}
          size={45}
        />
        <Tooltip title={Cookies.get('name')}>
          <Avatar
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            style={{
              cursor: 'pointer',
              backgroundColor: darkMode ? 'rgb(140,110,99)' : '#7BACB4',
            }}
          >
            {Cookies.get('name').slice(0, 2)}
          </Avatar>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={open}
          onClose={handleClose}
          className={classes.menu}
        >
          <Link to="/profile" className="link-rout">
            <Button
              onClick={() => setAnchorEl(null)}
              className={classes.infoButton}
              style={{ minWidth: 150 }}
              variant="contained"
              color="default"
            >
              Profile
            </Button>
          </Link>
          <Link to="/addnewchallenge" className="link-rout">
            <Button
              onClick={() => setAnchorEl(null)}
              className={classes.infoButton}
              style={{ minWidth: 150 }}
              variant="contained"
              color="default"
            >
              Add New Challenge
            </Button>
          </Link>
          {isAdmin
          && (
            <Link to="/admin" className="link-rout">
              <Button
                onClick={() => setAnchorEl(null)}
                className={classes.infoButton}
                style={{ minWidth: 150 }}
                variant="contained"
                color="default"
              >
                Admin Area
              </Button>
            </Link>
          )}
          <Button
            className={classes.logOutButton}
            onClick={logOut}
            style={{ minWidth: 150 }}
            variant="contained"
            color="secondary"
          >
            Log Out
          </Button>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
