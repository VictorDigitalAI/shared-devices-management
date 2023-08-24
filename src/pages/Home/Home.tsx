import React, {useState} from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import './Home.scss';
import {DotButton, DotDrawer, DotIconButton} from '@digital-ai/dot-components';
import {useDispatch, useSelector} from 'react-redux';
import {MANGER_INFO_KEY, TOKEN_KEY} from '../../constants/constants';
import {removeToken} from '../../store/authentication';
import {ROUTES} from '../../constants/routes';
import CloudServerGroups from "../CloudServerGroups/CloudServerGroups";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shareManagerInfo = useSelector((state: any) => state.authentication.shareManagerInfo);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(MANGER_INFO_KEY);
        dispatch(removeToken);
        navigate('/login');
    }

    const navigationLinks = [
        {
            title: "Dashboard",
            path: ROUTES.DASHBOARD
        },
        {
            title: "Shared Devices",
            path: ROUTES.SHARED_DEVICES
        },
        {
            title: "Shared Device Groups",
            path: ROUTES.SHARED_DEVICE_GROUPS
        },
        {
            title: "Cloud Server Groups",
            path: ROUTES.CLOUD_SERVER_GROUPS
        }
    ]

    return (
        <>
            <DotDrawer onClose={() => setIsDrawerOpened(false)}
                       anchor="left"
                       open={isDrawerOpened}>
                <div className="navigation-close">
                    <DotIconButton shape="circle" tooltip="Close" onClick={() => setIsDrawerOpened(false)} iconId="close"/>
                </div>
                {navigationLinks.map(link => {
                    return <NavLink to={link.path}
                                    key={link.path}
                                    onClick={() => setIsDrawerOpened(false)}
                                    className={({isActive}) => isActive ? "active" : ""}>
                        <div className="navigation-button">{link.title}</div>
                    </NavLink>
                })}
            </DotDrawer>

            <div className="home">
                <header>
                    <div className="drawer-button">
                        <DotIconButton onClick={() => setIsDrawerOpened(true)} color="primary" iconId="menu"/>
                        <img src="https://digital.ai/wp-content/uploads/2021/04/digitalai-logo@1x.png" width="100px" alt="logo"/>
                    </div>
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

        </>
    );
};

export default Home;
