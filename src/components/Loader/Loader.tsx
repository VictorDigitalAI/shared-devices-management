import React from 'react';
import './Loader.scss';
// @ts-ignore
import loader from '../../assets/spinner.svg';

const Loader = () => {
    return (
        <div className="loader-container">
            <img src={loader}/>
        </div>
    );
};

export default Loader;