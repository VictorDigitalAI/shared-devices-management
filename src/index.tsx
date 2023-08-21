import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {DotThemeProvider} from '@digital-ai/dot-components';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {router} from './router';

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
