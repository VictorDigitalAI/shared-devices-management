import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {DotThemeProvider} from '@digital-ai/dot-components';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Page404 from './pages/Page404/Page404';
import RequireAuth from './components/RequireAuth';
import {Provider} from 'react-redux';
import {store} from './store/store';
import SharedDevices from './pages/SharedDevices/SharedDevices';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><Home/></RequireAuth>,
        children: [
            {
                path: "/shared-devices",
                element: <SharedDevices/>
            }
        ]
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
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </DotThemeProvider>
    </React.StrictMode>
);
