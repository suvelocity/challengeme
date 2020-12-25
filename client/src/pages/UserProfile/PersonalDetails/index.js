import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import mixpanel from 'mixpanel-browser';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import network from '../../../services/network';
import EditIcon from '@material-ui/icons/Edit';
import './UserInfo.css';
import { Button } from '@material-ui/core';
import ResetPassword from '../../../components/Modals/ChangePassword';
import moment from 'moment';
import Swal from 'sweetalert2';

const useStyles = makeStyles(() => ({
  info: {
    width: '200px',
    margin: '10px 0px',
  },
  infoDark: {
    width: '200px',
    '&>label': {
      color: 'rgba(255,255,255,0.7)',
    },
    '&>div': {
      color: 'white',
    },
  },
  userProfileBackToMyProfile: {
    margin: '20px 0px -20px 0px',
  },
}));

function generateTime(date) {
  if (!date) return ''
  let today = new Date(date);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return `${today}`;
}

const generateName = (name) => {
  let changedName = '';
  if (name) {
    for (let i = 0; i < name.length; i++) {
      i === 0 ? (changedName += name[i].toUpperCase()) : (changedName += name[i].toLowerCase());
    }
    return changedName;
  } else {
    return ''
  }
};

const getUpdated = (date) => {
  return moment(date).fromNow()
}

function UserInfo({ darkMode }) {
  const [userInfo, setUserInfo] = useState({});
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [resetPasswordModal, setResetPasswordModal] = useState(false)
  const classes = useStyles();

  const fetchUserInfo = async () => {
    try {
      const username = Cookies.get('userName');
      mixpanel.track('User On Personal Details Page', { User: `${username}` });
      const { data: info } = await network.get('/api/v1/users/info');
      setUserInfo(info);
      setEditedUserInfo(info)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchUserInfo()
  }, []);

  const startEditInfo = async () => {
    setIsReadOnly(false)
  }

  const editing = async (event) => {
    const key = event.target.name;
    const value = event.target.value
    const edited = { ...editedUserInfo }
    edited[key] = value
    setEditedUserInfo(edited)
  }

  const onSave = async () => {
    try {
      await network.patch('/api/v1/users/info', editedUserInfo);
      fetchUserInfo()
      setIsReadOnly(true)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message,
        showConfirmButton: true,
      });
    }
  }
  const onCancel = () => {
    setEditedUserInfo(userInfo)
    setIsReadOnly(true)
  }

  const changePassword = async () => {
    setResetPasswordModal(true)
  }


  return userInfo.userName ? (
    <div className="generic-page">
      <div className="user-page">
        <div className="user-info-container">
          <h1>User Info</h1>
          {resetPasswordModal &&
            <ResetPassword
              open={resetPasswordModal}
              setOpen={setResetPasswordModal}
            />}
          <Button onClick={startEditInfo}><EditIcon /></Button>
          {!isReadOnly &&
            <Button onClick={changePassword}>
              Change Password
            </Button>
          }
          <TextField
            name='firstName'
            onChange={editing}
            className={darkMode ? classes.infoDark : classes.info}
            value={generateName(editedUserInfo.firstName)}
            label="First name"
            InputProps={{ readOnly: isReadOnly }}
          />
          <TextField
            name='lastName'
            onChange={editing}
            className={darkMode ? classes.infoDark : classes.info}
            label="Last name"
            value={generateName(editedUserInfo.lastName)}
            InputProps={{ readOnly: isReadOnly }}
          />
          {isReadOnly ?
            <TextField
              name='birthDate'
              className={darkMode ? classes.infoDark : classes.info}
              style={{ color: 'white' }}
              label="Birth Date"
              value={generateTime(editedUserInfo.birthDate)}
              InputProps={{ readOnly: isReadOnly }}
            /> :
            <>
              <label
                style={{
                  marginRight: '130px',
                  marginBottom: '5px',
                  color: 'gray',
                }}
              >
                Birth Date
      </label>
              <input
                className={classes.birthDate}
                name="birthDate"
                type="date"
                value={generateTime(editedUserInfo.birthDate)}
                onChange={editing}
              />
            </>
          }
          <TextField
            onChange={editing}
            name='country'
            className={darkMode ? classes.infoDark : classes.info}
            label="Country"
            value={editedUserInfo.country ? editedUserInfo.country : ''}
            InputProps={{ readOnly: isReadOnly }}
          />
          <TextField
            onChange={editing}
            name='city'
            className={darkMode ? classes.infoDark : classes.info}
            label="City"
            value={editedUserInfo.city ? editedUserInfo.city : ''}
            InputProps={{ readOnly: isReadOnly }}
          />
          <TextField
            onChange={editing}
            name='githubAccount'
            className={darkMode ? classes.infoDark : classes.info}
            label="Github"
            value={editedUserInfo.githubAccount ? editedUserInfo.githubAccount : ''}
            InputProps={{ readOnly: isReadOnly }}
          />
          <TextField
            className={darkMode ? classes.infoDark : classes.info}
            label="Account Created"
            value={getUpdated(editedUserInfo.createdAt)}
            InputProps={{ readOnly: true }}
          />
          {!isReadOnly &&
            <div style={{ display: 'flex' }}>
              <Button onClick={onSave} >save</Button>
              <Button onClick={onCancel} >cancel</Button>
            </div>}

        </div>
      </div>
    </div>
  ) : (
      <div />
    );
}

export default UserInfo;
