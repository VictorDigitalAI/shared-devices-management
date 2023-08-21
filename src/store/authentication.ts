import {createSlice} from '@reduxjs/toolkit';
import {MANGER_INFO_KEY} from '../constants/constants';

export const AUTH_REDUCER = 'authentication';

const authentication = createSlice({
    name: AUTH_REDUCER,
    initialState: {
        token: '',
        shareManagerInfo: JSON.parse(localStorage.getItem(MANGER_INFO_KEY) || '') || {}
    },
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload;
        },
        addShareManagerInfo: (state, action) => {
            state.shareManagerInfo = action.payload;
        },
        removeToken: (state, action) => {
            state.token = '';
            state.shareManagerInfo = {};
        }
    }
});

export const addToken = authentication.actions.addToken;
export const addShareManagerInfo = authentication.actions.addShareManagerInfo;
export const removeToken = authentication.actions.removeToken;
export default authentication.reducer;