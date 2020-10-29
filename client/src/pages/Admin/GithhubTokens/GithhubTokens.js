import React, { useEffect, useState } from 'react';
import network from '../../../services/network';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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
            <StyledTableRow className={classes.root}>
                <StyledTableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.token}</StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">{row.gitAccount}</StyledTableCell>
                <StyledTableCell align="left">{row.actionsLimit}</StyledTableCell>
                <StyledTableCell align="left">{new Date(row.updatedAt).toString().substring(0, 24)}</StyledTableCell>
                <StyledTableCell align="left">{new Date(row.createdAt).toString().substring(0, 24)}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    {/* <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                More Details
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell >User Id</StyledTableCell>
                                        <StyledTableCell align="left">Phone Number</StyledTableCell>
                                        <StyledTableCell align="left">Country</StyledTableCell>
                                        <StyledTableCell align="left">City</StyledTableCell>
                                        <StyledTableCell align="left">Birth Date</StyledTableCell>
                                        <StyledTableCell align="left">Security Question</StyledTableCell>
                                        <StyledTableCell align="left">Reason Of Registration</StyledTableCell>
                                        <StyledTableCell align="left">Created At</StyledTableCell>
                                        <StyledTableCell align="left">Updated At</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow key={row.userName}>
                                        <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                        <StyledTableCell> {row.phoneNumber} </StyledTableCell>
                                        <StyledTableCell align="left">{row.country}</StyledTableCell>
                                        <StyledTableCell align="left">{row.city}</StyledTableCell>
                                        <StyledTableCell align="left">{new Date(row.birthDate).toDateString()}</StyledTableCell>
                                        <StyledTableCell align="left">{row.securityQuestion}</StyledTableCell>
                                        <StyledTableCell align="left"> {row.reasonOfRegistration}</StyledTableCell>
                                        <StyledTableCell align="left">{new Date(row.createdAt).toString().substring(0, 24)}</StyledTableCell>
                                        <StyledTableCell align="left">{new Date(row.updatedAt).toString().substring(0, 24)}</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse> */}
                </StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}
function GithhubTokens() {

    const [allTokens, setAllTokens] = useState([])
    const [newToken, setNewToken] = useState()
    const [newTokenGitAccount, setNewTokeGgitAccount] = useState()
    const [newTokenActionslimit, setNewTokeActionslimit] = useState()

    async function getAllTokens() {
        const { data: allTokensFromServer } = await network.get('/api/v1/git/')
        setAllTokens(allTokensFromServer)
    }

    const addNewToken = async () => {
        const newTokenObj = {
            token: newToken,
            gitAccount: newTokenGitAccount,
            actionsLimit: newTokenActionslimit
        }
        try {
            const response = await network.post('/api/v1/git/', newTokenObj);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllTokens()
    }, [])

    return (
        <div className="admin" style={{ marginTop: '60px', textAlign: 'center' }}>
            <h1>Githhub Tokens Handle Area</h1>
            <Button variant="contained" color="secondary">
                <Link to='/admin' ><h2>Admin Router</h2></Link>
            </Button >
            <input onChange={(event) => setNewToken(event.target.value)} placeholder='Insert Token...' />
            <input onChange={(event) => setNewTokeGgitAccount(event.target.value)} placeholder='Insert Github Account...' />
            <input onChange={(event) => setNewTokeActionslimit(event.target.value)} placeholder='Insert Action Limit...' />
            <Button
                variant="contained"
                color="secondary"
                onClick={addNewToken}
            >
                Add New Token
            </Button>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="left">Token</StyledTableCell>
                            <StyledTableCell align="left">Status</StyledTableCell>
                            <StyledTableCell align="left">Github Account</StyledTableCell>
                            <StyledTableCell align="left">Actions Limit</StyledTableCell>
                            <StyledTableCell align="left">Created At</StyledTableCell>
                            <StyledTableCell align="left">Uppdated At</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allTokens[0] && allTokens[0].map(token => (
                            <Row key={token.token} row={token} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GithhubTokens;
