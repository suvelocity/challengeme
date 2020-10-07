import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../services/network'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const updateField = (e) => {
        switch (e.currentTarget.name) {
            case "password":
                setPassword(e.currentTarget.value)
                break;
            case "username":
                setUsername(e.currentTarget.value)
                break;
            case "rememberMe":
                setRememberMe(prevState => !prevState);
                break;
        }
    }

    useEffect(() => {
        console.log(rememberMe)
    }, [rememberMe])

    const loginFunc = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        //request to server
        //axios.post("/loginEndPoint", {username: username, password:password})
    }

    return (
        <div>
            <form onSubmit={loginFunc}>
                <input type="text" id="username-field" name="username" value={username} required onChange={updateField} />
                <input type="password" id="password-field" name="password" value={password} required onChange={updateField} />
                <button type='submit' id="login-button">Login</button>
            </form>
            <label htmlFor='rememberMe'>Remember Me: </label>
            <input type="checkbox" id='rememberMe' name="rememberMe" onChange={updateField} />
            <br />
            <span>don't have an account yet?</span>
            <Link to='/register'>
                <button >Sign up</button>
            </Link>
            <br />
            <button>Log in with google</button>
            <button>Log in with github</button>
        </div >
    )
}
