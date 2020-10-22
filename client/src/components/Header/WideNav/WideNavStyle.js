import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export default makeStyles((theme) => ({
  appBarRegolar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  darkModeToggle: {
    marginRight: '10px;',
  },
  infoButton: {
    margin: '10px',
  },
  logOutButton: {
    margin: '10px',
  },
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  generalDrawerHeader: {
    display: 'flex',
  },
  drawerHeader: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  list: {
    padding: 0,
  },
  avatarUserInfo: {
    margin: '20px',
  },
  filterButton: {
    backgroundColor: 'rgb(219,219,219)',
    marginLeft: '10px',
  },
  filterButtonDark: {
    backgroundColor: 'rgb(81,81,81)',
    color: 'white',
    marginLeft: '10px',
  },
}));
