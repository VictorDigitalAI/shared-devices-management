import "./Login.scss";
import React, {ChangeEvent, useState} from 'react';
import {DotButton, DotForm, DotInputText} from '@digital-ai/dot-components';
import {AUTH_URL, MANGER_INFO_KEY, TOKEN_KEY} from '../../constants/constants';
import {Navigate, useNavigate} from 'react-router-dom';
import {TextFormInput} from '../../models/form.models';
import {useDispatch} from 'react-redux';
import {addShareManagerInfo, addToken} from '../../store/authentication';
import axios from 'axios';
// @ts-ignore
import {NotificationManager} from 'react-notifications';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [usernameField, setUsernameField] = useState<TextFormInput>({value: '', error: false});
    const [passwordField, setPasswordField] = useState<TextFormInput>({value: '', error: false});

    if (localStorage.getItem(TOKEN_KEY)) {
        dispatch(addToken(localStorage.getItem(TOKEN_KEY)));
        return <Navigate to={"/"}/>;
    }

    const usernameInputHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        if (value) {
            setUsernameField({value: value, error: false});
        } else {
            setUsernameField(prevState => ({value: prevState.value, error: true}));
        }
    }

    const passwordInputHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        if (value) {
            setPasswordField({value: value, error: false});
        } else {
            setPasswordField(prevState => ({value: prevState.value, error: true}));
        }
    }

    const loginSubmitHandler = (credentials: any) => {
        credentials.preventDefault();

        if (usernameField.value && passwordField.value) {
            setIsLoading(true);
            axios.get(AUTH_URL + '/manage/info', {
                auth: {username: usernameField.value, password: passwordField.value}
            }).then(response => {
                if (response.data?.build) {
                    dispatch(addShareManagerInfo(response.data?.build));
                    localStorage.setItem(MANGER_INFO_KEY, JSON.stringify(response.data?.build));
                }
                const token = btoa(usernameField.value + ":" + passwordField.value);
                localStorage.setItem(TOKEN_KEY, token);
                dispatch(addToken(token));
                setIsLoading(false);
                navigate('/');
            }).catch(() => {
                setIsLoading(false);
                NotificationManager.error('Login', 'Wrong credentials or other issue', 5000);
            });
        }

    }

    return (
        <div className="form-wrapper">
            <div>
                <h1 className="title">Shared Devices Management</h1>
            </div>
            <div>
                <h2>Login</h2>
                <DotForm onSubmit={loginSubmitHandler}>
                    <DotInputText id="username"
                                  disabled={isLoading}
                                  name="username"
                                  onChange={usernameInputHandler}
                                  required={true}
                                  label="Username"
                                  error={usernameField.error}/>
                    <DotInputText id="password"
                                  disabled={isLoading}
                                  name="password"
                                  type="password"
                                  onChange={passwordInputHandler}
                                  required={true}
                                  label="Password"
                                  error={passwordField.error}/>
                    <DotButton isSubmit={true}
                               disabled={!usernameField.value || !passwordField.value || isLoading}>{isLoading ? 'Wait...' : 'Login'}</DotButton>
                </DotForm>
            </div>
        </div>
    );
};

export default Login;