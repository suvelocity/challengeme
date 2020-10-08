import React from 'react';
import { NavLink } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Switch from '@material-ui/core/Switch';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';
import './Header.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <NavLink
              to='/'
              activeStyle={{ color: 'white' }}
              className='link-rout'
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px',
                }}
              >
                <HomeIcon />
                &nbsp;
                <span className='header-link-title'>Home</span>
              </div>
            </NavLink>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div style={{ flex: 1 }}></div> 
          {/* Make space between the search input and the rest of the header. */}
          <Button color='inherit'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
              }}
            >
              <EqualizerIcon />
              &nbsp;
              <span className='header-link-title'>Statistics</span>
            </div>
          </Button>
          <Tooltip title='hhhhhhhh'>
            <Avatar
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
              style={{ cursor: 'pointer', backgroundColor: 'purple' }}
            >
              HH
              {/* Cookie.get(username).slice(0, 2) */}
            </Avatar>
          </Tooltip>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Switch
                checked={state.checkedB}
                onChange={handleChange}
                color='primary'
                name='checkedB'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </MenuItem>
            <MenuItem onClick={handleClose} style={{color: 'red'}}>Log Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;