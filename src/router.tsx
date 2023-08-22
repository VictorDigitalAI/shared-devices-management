import {createBrowserRouter} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home/Home';
import SharedDevices from './pages/SharedDevices/SharedDevices';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Page404 from './pages/Page404/Page404';
import {ROUTES} from './constants/routes';
import SharedDeviceGroups from './pages/SharedDeviceGroups/SharedDeviceGroups';
import ShareManagerNotAvailable from './pages/ShareManagerNotAvailable/ShareManagerNotAvailable';

export const router = createBrowserRouter([
    {
        path: ROUTES.DASHBOARD,
        element: <RequireAuth><Home/></RequireAuth>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: ROUTES.SHARED_DEVICES,
                element: <SharedDevices/>
            },
            {
                path: ROUTES.SHARED_DEVICE_GROUPS,
                element: <SharedDeviceGroups/>
            }
        ]
    },
    {
        path: ROUTES.LOGIN,
        element: <Login/>
    },
    {
        path: ROUTES.MANGER_NOT_AVAILABLE,
        element: <RequireAuth><ShareManagerNotAvailable/></RequireAuth>
    },
    {
        path: "*",
        element: <Page404/>
    }
]);
