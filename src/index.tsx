import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {DotThemeProvider} from '@digital-ai/dot-components';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {router} from './router';
// @ts-ignore
import {NotificationContainer} from 'react-notifications';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <DotThemeProvider>
        <Provider store={store}>
            <NotificationContainer/>
            <RouterProvider router={router}/>
        </Provider>
    </DotThemeProvider>
);
