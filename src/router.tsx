import {createBrowserRouter} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home/Home';
import SharedDevices from './pages/SharedDevices/SharedDevices';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Page404 from './pages/Page404/Page404';
import {ROUTES} from './constants/routes';

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <RequireAuth><Home/></RequireAuth>,
        children: [
            {
                index: true,
                element: <SharedDevices/>
            },
            {
                path: ROUTES.DASHBOARD,
                element: <Dashboard/>
            }
        ]
    },
    {
        path: ROUTES.LOGIN,
        element: <Login/>
    },
    {
        path: "*",
        element: <Page404/>
    }
]);
