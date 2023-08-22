import './ShareManagerNotAvailable.scss';

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {DotButton} from '@digital-ai/dot-components';
import {ROUTES} from '../../constants/routes';

const ShareManagerNotAvailable = () => {

    const navigate = useNavigate();

    return (
        <div className="manager-not-available">
            <h1>Oops!!</h1>
            <div>Share manager not available!</div>
            <DotButton type="outlined" onClick={() => navigate(ROUTES.DASHBOARD)}>Go to Dashboard</DotButton>
        </div>
    );
};

export default ShareManagerNotAvailable;