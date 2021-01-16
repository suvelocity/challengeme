import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import network from '../../../services/network';
import { Logged } from '../../../context/LoggedInContext';

function GithubAuth() {
    const history = useHistory();
    const url = useLocation();
    const query = new URLSearchParams(url.search);
    const code = query.get('code');
    const LoggedContext = useContext(Logged);

    const loginSeason = async () => {
        try {
            const { data: response } = await network.post('/api/v1/auth/authentication-with-github', { code })
            LoggedContext.setLogged(true);
            LoggedContext.setIsAdmin(response.isAdmin);
            history.push('/')
            Swal.fire({
                icon: 'success',
                title: response.title,
                text: response.message,
                cancelButtonText: 'OK',
            })
        } catch (error) {
            history.push('/login');
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Github Authentication failed',
            })
        }
    }

    useEffect(() => {
        loginSeason();
        // eslint-disable-next-line
    }, [history, code]);

    return <div />;
}

export default GithubAuth;
