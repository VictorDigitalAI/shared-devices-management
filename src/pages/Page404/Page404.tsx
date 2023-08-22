import React from 'react';
import './Page404.scss';
import {useNavigate} from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div className="page-404">
            <h1>404</h1>
            <h3>Not found</h3>
            <span>The resource request could not be found on this server.</span>
        </div>
    );
};

export default Page404;