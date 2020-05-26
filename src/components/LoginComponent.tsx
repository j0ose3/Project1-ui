import React, { useState } from 'react';

// import { Alert } from '@material-ui/lab'
import { 
    // Typography, 
    FormControl, 
    InputLabel, 
    Input,
    // Button, 
    makeStyles 
} from '@material-ui/core';

import { authenticate } from '../remote/auth-service';
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';

interface ILoginProps {
    authUser: User;
    setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 20,
        padding: 20
    },
    loginForm: {
        width: "50%"
    }
});

function LoginComponent(props: ILoginProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async () => {
        let authUser = await authenticate(username, password);
        props.setAuthUser(authUser);
    }

    let onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>): void => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          login();
        }
    }

    return (
        props.authUser ?
        <Redirect to="/home" /> :
        <>
            <div className="background-login">
                <div className="jumbotron-login">
                    <div className={classes.loginContainer}>
                        <form className={classes.loginForm}>
                            <h1 className="display-4">Login</h1>

                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input 
                                    onChange={updateUsername} 
                                    value={username} 
                                    id="username" type="text" 
                                    placeholder="Enter your username" />
                            </FormControl>

                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input 
                                    onChange={updatePassword}
                                    value={password}
                                    id="password" type="password"
                                    placeholder="Enter your password"/>
                            </FormControl>
                            <br/><br/>
                            <a className="btn btn-primary btn-lg" style={{color: 'white'}} onKeyDown={onKeyDown} onClick={login} role="button">Login</a>
                            <br/><br/>
                            {
                                errorMessage 
                                    ? 
                                <span style={{color:"red"}}>{errorMessage}</span>
                                    :
                                <></>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </> 
    );
}
export default LoginComponent;