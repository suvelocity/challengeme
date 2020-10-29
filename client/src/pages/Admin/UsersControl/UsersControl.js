import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import network from "../../../services/network";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.userName}
                </TableCell>
                <TableCell align="left">{row.firstName}{' '}{row.lastName}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.githubAccount}</TableCell>
                <TableCell align="left">{row.permission}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                More Details
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >User Id</TableCell>
                                        <TableCell align="left">Phone Number</TableCell>
                                        <TableCell align="left">Country</TableCell>
                                        <TableCell align="left">City</TableCell>
                                        <TableCell align="left">Birth Date</TableCell>
                                        <TableCell align="left">Security Question</TableCell>
                                        <TableCell align="left">Reason Of Registration</TableCell>
                                        <TableCell align="left">Created At</TableCell>
                                        <TableCell align="left">Updated At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.userName}>
                                        <TableCell component="th" scope="row">{row.id}</TableCell>
                                        <TableCell> {row.phoneNumber} </TableCell>
                                        <TableCell align="left">{row.country}</TableCell>
                                        <TableCell align="left">{row.city}</TableCell>
                                        <TableCell align="left">{new Date(row.birthDate).toDateString()}</TableCell>
                                        <TableCell align="left">{row.securityQuestion}</TableCell>
                                        <TableCell align="left"> {row.reasonOfRegistration}</TableCell>
                                        <TableCell align="left">{new Date(row.createdAt).toString().substring(0, 24)}</TableCell>
                                        <TableCell align="left">{new Date(row.updatedAt).toString().substring(0, 24)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function UsersControl() {
    const [allUsers, setAllUsers] = useState([])

    async function getAllUsers() {
        const { data: allUsersFromServer } = await network.get('/api/v1/admin/allusers')
        setAllUsers(allUsersFromServer)
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div style={{ paddingTop: '50px', textAlign: 'center' }} >
            <h1>This is Users Control page</h1>
            <Link to='/admin' ><h3>admin router</h3></Link>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>User Name</TableCell>
                            <TableCell align="left">Full Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Github Account</TableCell>
                            <TableCell align="left">Permission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers && allUsers.map(user => (
                            <Row key={user.userName + user.id} row={user} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UsersControl;
