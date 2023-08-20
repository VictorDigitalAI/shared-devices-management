import "./Login.scss";
import React, {ChangeEvent, useState} from 'react';
import {DotButton, DotForm, DotInputText} from '@digital-ai/dot-components';
import {TOKEN_KEY} from '../../constants/constants';
import {Navigate, useNavigate} from 'react-router-dom';
import {TextFormInput} from '../../models/form-models';
import {useDispatch} from 'react-redux';
import {addToken} from '../../store/authentication';

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

        // const config = {
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     },
        //     auth: {username: usernameField.value, password: passwordField.value}
        // };

        if (usernameField.value && passwordField.value) {
            localStorage.setItem(TOKEN_KEY, btoa(usernameField.value + ":" + passwordField.value));
            navigate('/');
            // axios.get(BASE_V1_URL + "/devices", config).then(response => console.log(response)).catch(err => console.error(err));
            // axios.get(AUTH_URL + '/manage/info', config).then(response => console.log(response)).catch(err => console.error(err));
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
                                  name="username"
                                  onChange={usernameInputHandler}
                                  required={true}
                                  label="Username"
                                  error={usernameField.error}/>
                    <DotInputText id="password"
                                  name="password"
                                  type="password"
                                  onChange={passwordInputHandler}
                                  required={true}
                                  label="Password"
                                  error={passwordField.error}/>
                    <DotButton isSubmit={true} disabled={!usernameField.value || !passwordField.value}>Login</DotButton>
                </DotForm>
            </div>
        </div>
    );
};

export default Login;