import React from 'react';
import {DotButton} from '@digital-ai/dot-components';
import {TOKEN_KEY} from '../../constants/constants';
import {Navigate} from 'react-router-dom';

const Login = () => {

    const loginSubmitHandler = () => {
        localStorage.setItem(TOKEN_KEY, 'some token');
    }

    if (localStorage.getItem(TOKEN_KEY)) {
        return <Navigate to={"/"}/>;
    }

    return (
        <div>
            Login page!
            <DotButton onClick={loginSubmitHandler}>Login</DotButton>
        </div>
    );
};

export default Login;