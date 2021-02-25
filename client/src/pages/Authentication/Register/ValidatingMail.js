import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import Swal from 'sweetalert2';
import { Logged } from '../../../context/LoggedInContext';
import network from '../../../services/network';

function ValidatingMail() {
  const location = useHistory();
  const url = useLocation();
  const LoggedContext = useContext(Logged);

  const query = new URLSearchParams(url.search);
  const token = query.get('token');
  useEffect(() => {
    try {
      network
        .post('/api/v1/auth/create-user', { token })
        .then((data) => {
          LoggedContext.setLogged(true);
          LoggedContext.setIsAdmin(data.isAdmin);
          mixpanel.track('User Logged In', { User: `${data.userName}`, firstLogin: true });
          location.push('/');
          Swal.fire({
            icon: 'success',
            title: 'Registration Completed',
            timer: 3000,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Email Confirmation Failed, Please try again later.',
          }).then(() => {
            location.push('/login');
          });
        });
    } catch (error) {
    }
    // eslint-disable-next-line
  }, [location, token]);

  return <div />;
}

export default ValidatingMail;
