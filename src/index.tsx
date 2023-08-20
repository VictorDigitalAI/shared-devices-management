import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {DotThemeProvider} from '@digital-ai/dot-components';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Page404 from './pages/Page404/Page404';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><Home/></RequireAuth>,
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "*",
        element: <Page404/>
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <DotThemeProvider>
            <RouterProvider router={router}/>
        </DotThemeProvider>
    </React.StrictMode>
);
