import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authentication from './authentication';
import sharedDevices from './sharedDevices';

const rootReducer = combineReducers({
    authentication: authentication,
    sharedDevices: sharedDevices
});

export const store = configureStore({
    reducer: rootReducer
});