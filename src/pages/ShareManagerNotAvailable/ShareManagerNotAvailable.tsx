import './ShareManagerNotAvailable.scss';

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {DotButton} from '@digital-ai/dot-components';
import {ROUTES} from '../../constants/routes';

const ShareManagerNotAvailable = () => {

    const navigate = useNavigate();

    return (
        <div className="manager-not-available">
            <div>Share manager not available!</div>
            <DotButton onClick={() => navigate(ROUTES.DASHBOARD)}>GO HOME</DotButton>
        </div>
    );
};

export default ShareManagerNotAvailable;