import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import './Home.scss';
import {DotButton} from '@digital-ai/dot-components';
import {useDispatch} from 'react-redux';
import {TOKEN_KEY} from '../../constants/constants';
import {removeToken} from '../../store/authentication';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken);
        navigate('/login');
    }

    return (
        <div className="home">
            <header>
                <img src="https://digital.ai/wp-content/uploads/2021/04/digitalai-logo@1x.png" width="100px" alt="logo"/>
                <span>Shared Devices Management</span>
                <DotButton type="outlined" onClick={logoutHandler}>Log Out</DotButton>
            </header>
            <div className="outlet-container">
                <Outlet/>
            </div>
        </div>
    );
};

export default Home;