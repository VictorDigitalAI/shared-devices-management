import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import './Home.scss';
import {DotButton} from '@digital-ai/dot-components';
import {useDispatch, useSelector} from 'react-redux';
import {MANGER_INFO_KEY, TOKEN_KEY} from '../../constants/constants';
import {removeToken} from '../../store/authentication';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shareManagerInfo = useSelector((state: any) => state.authentication.shareManagerInfo);

    const logoutHandler = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(MANGER_INFO_KEY);
        dispatch(removeToken);
        navigate('/login');
    }

    return (
        <div className="home">
            <header>
                <img src="https://digital.ai/wp-content/uploads/2021/04/digitalai-logo@1x.png" width="100px" alt="logo"/>
                <div className="header-manager-version">
                    <span>{shareManagerInfo.name.split('-').join(" ").toUpperCase()}</span>
                    <span>v.{shareManagerInfo.version}</span>
                </div>
                <DotButton type="outlined" onClick={logoutHandler}>Log Out</DotButton>
            </header>
            <div className="outlet-container">
                <Outlet/>
            </div>
        </div>
    );
};

export default Home;