import React from 'react';
import {Outlet} from 'react-router-dom';
import './Home.scss';

const Home = () => {
    return (
        <div className="home">
            <header>

            </header>

            <Outlet/>

            <footer>

            </footer>
        </div>
    );
};

export default Home;