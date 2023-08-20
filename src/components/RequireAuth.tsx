import React, {JSX, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {TOKEN_KEY} from '../constants/constants';

const RequireAuth = ({children}: {children: JSX.Element}) => {

    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    } else {
        return children;
    }
};

export default RequireAuth;