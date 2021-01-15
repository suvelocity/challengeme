import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import network from '../../../services/network';

function GithubAuth() {
    const history = useHistory();
    const url = useLocation();
    const query = new URLSearchParams(url.search);
    const code = query.get('code');
    useEffect(() => {
        try {
            network
                .post('/api/v1/auth/authentication-with-github', { code })
                .then((data) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Authentication Success',
                        text: 'Github Confirmation Success !',
                        cancelButtonText: 'OK',
                    }).then(() => {
                        console.log(data);
                        history.push('/')
                    })
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email Confirmation Failed !',
                    }).then(() => {
                        history.push('/login');
                    });
                });
        } catch (error) {
        }
    }, [history, code]);

    return <div />;
}

export default GithubAuth;
