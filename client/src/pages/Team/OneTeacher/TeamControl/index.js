import React, { useEffect, useState } from 'react';
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
import network from '../../../../services/network';
import AddTeamMembers from '../../../../components/Modals/AddTeamMembers';

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
  const { row, getAllTeams, teamId } = props;
  const [open, setOpen] = useState(false);

  const removeUserFromTeam = async (user) => {
    try {
      const isDeleteOk = prompt("What's your favorite cocktail drink?");
      if (isDeleteOk != null) {
        await network.delete(`/api/v1/teams/remove-user/${teamId}?userId=${user}`);
        getAllTeams();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeUserPermissionOnTeam = async (user, permission) => {
    try {
      const isDeleteOk = prompt("What's your favorite cocktail drink?");
      if (isDeleteOk != null) {
        const newPermission = permission === 'student' ? 'teacher' : 'student';
        await network.patch(`/api/v1/teams/permission/${teamId}`, { userId: user, permission: newPermission });
        getAllTeams();
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
        <StyledTableCell align="left">{row.firstName + row.lastName}</StyledTableCell>
        <StyledTableCell align="left">{row.userName}</StyledTableCell>
        <StyledTableCell align="left">{row.UserTeam.permission}</StyledTableCell>
        <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Team Members
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Change Permission</StyledTableCell>
                    <StyledTableCell align="left">Remove Student</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow key={row.userName}>
                    <StyledTableCell component="th" scope="row">
                      <Button onClick={() => changeUserPermissionOnTeam(row.id, row.UserTeam.permission)}>CLick</Button>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Button onClick={() => removeUserFromTeam(row.id)}>Click</Button>
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
function TeamsControl({ teamId }) {
  const [allMembers, setAllMembers] = useState([]);
  const [teamNameForMember, setTeamNameForMember] = useState(false);
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

  async function getAllTeamMembers() {
    try {
      const { data: allTeamsFromServer } = await network.get(`/api/v1/teams/teacher-area/${teamId}`);
      setAllMembers(allTeamsFromServer.Users);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddMemberModal = (team) => {
    setTeamNameForMember(team);
    setOpenAddMemberModal(true);
  };

  useEffect(() => {
    getAllTeamMembers();
        // eslint-disable-next-line
  }, []);

  return (
    <div className="team-control" style={{ marginTop: '60px', textAlign: 'center' }}>
      <h1>Team Management</h1>
      <AddTeamMembers open={openAddMemberModal} setOpen={setOpenAddMemberModal} getAllTeams={getAllTeamMembers} teamNameForMember={teamNameForMember} />
      <Button onClick={() => handleAddMemberModal(teamId)}>Add Team Members</Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">userName</StyledTableCell>
              <StyledTableCell align="left">Permission</StyledTableCell>
              <StyledTableCell align="left">Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMembers && allMembers.map((user) => (
              <Row
                key={user.id + user.userName}
                row={user}
                teamId={teamId}
                getAllTeams={getAllTeamMembers}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TeamsControl;
