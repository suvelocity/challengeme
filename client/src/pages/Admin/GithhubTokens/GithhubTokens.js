import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import network from '../../../services/network';
import AddToken from '../../../components/Modals/AddToken';

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
  const { row, getAllTokens } = props;
  const [open, setOpen] = React.useState(false);

  const deleteToken = async (token) => {
    try {
      const isDeleteOk = prompt("What's your favorite cocktail drink?");
      if (isDeleteOk != null) {
        const response = await network.delete(`/api/v1/git/${token}`);
        console.log(response);
        getAllTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateToken = async (token, status) => {
    try {
      const isUpdateOk = prompt("Who's your favorite student?");
      if (isUpdateOk != null) {
        const newStatus = status === 'blocked' ? 'available' : 'blocked';
        const { data: allTokensFromServer } = await network.patch('/api/v1/git/', { token, status: newStatus });
        console.log(allTokensFromServer);
        getAllTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <StyledTableCell align="left"><div style={
          row.active
            ? { color: 'green' }
            :
            { color: 'red' }
        }          >{`${row.active}`}</div></StyledTableCell>
        <StyledTableCell align="left">{row.gitAccount}</StyledTableCell>
        <StyledTableCell align="left">{row.actionsLimit}</StyledTableCell>
        <StyledTableCell align="left">{new Date(row.updatedAt).toString().substring(0, 24)}</StyledTableCell>
        <StyledTableCell align="left">{new Date(row.createdAt).toString().substring(0, 24)}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Edit Area
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <StyledTableRow key={row.userName}>
                    <StyledTableCell component="th" scope="row">
                      <Button onClick={() => updateToken(row.token, row.status)}>Change Status</Button>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Button onClick={() => deleteToken(row.token)}>Delete Token</Button>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      Remaining: {row.remaining ? row.remaining : 'Not Active'}
                      </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}
function GithhubTokens() {
  const [allTokens, setAllTokens] = useState([]);
  const [open, setOpen] = useState(false);

  async function getAllTokens() {
    try {
      const { data: allTokensFromServer } = await network.get('/api/v1/git/');
      console.log(allTokensFromServer);
      setAllTokens(allTokensFromServer);
    } catch (error) {
      console.error(error);
    }
  }

  const addNewToken = () => {
    setOpen(true);
  };

  useEffect(() => {
    getAllTokens();
  }, []);

  return (
    <div className="admin" style={{ marginTop: '60px', textAlign: 'center' }}>
      <h1>Githhub Tokens Management Area</h1>
      <AddToken open={open} setOpen={setOpen} getAllTokens={getAllTokens} />
      <Button variant="contained" color="secondary">
        <Link to="/admin"><h2>Admin Router</h2></Link>
      </Button>
      <Button
        variant="contained"
        color="primary"
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
              <StyledTableCell align="left">Active</StyledTableCell>
              <StyledTableCell align="left">Github Account</StyledTableCell>
              <StyledTableCell align="left">Actions Limit</StyledTableCell>
              <StyledTableCell align="left">Created At</StyledTableCell>
              <StyledTableCell align="left">Updated At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTokens[0] && allTokens[0].map((token) => (
              <Row key={token.token} row={token} getAllTokens={getAllTokens} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GithhubTokens;