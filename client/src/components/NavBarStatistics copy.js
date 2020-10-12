import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom"
import ComboBox from './ComboBox'






// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//       display: 'none',
//     },
//   },
// }));

// export default function PrimarySearchAppBar() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);


//   const handleNavBarMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleNavBarMenuClose = () => {
//     setAnchorEl(null);
//   };



//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleNavBarMenuClose}
//     >
      

      
//       <Link to="/statistics/users">
//       <MenuItem onClick={handleNavBarMenuClose}>User Statistics</MenuItem>
//       </Link>

//       <Link to="/statistics/profile">
//       <MenuItem onClick={handleNavBarMenuClose}>Profile Statistics</MenuItem>
//       </Link>

//       <Link to="/statistics/insights">
//       <MenuItem onClick={handleNavBarMenuClose}>Insights Statistics</MenuItem>
//       </Link>

//       <Link to="/statistics/teams">
//       <MenuItem onClick={handleNavBarMenuClose}>Teams</MenuItem>
//       </Link>

//     </Menu>
//   );


//   return (
//     <div className={classes.grow}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             aria-label="Statistics Navbar Menu"
//             aria-controls={menuId}
//             className={classes.menuButton}
//             onClick={handleNavBarMenuOpen}
//             color="inherit"
//             aria-haspopup="true"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             Challenge Me Statistics
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search Challenge"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div>
//           <div className={classes.grow} />
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//     </div>
//   );
// }



