import {createSlice} from '@reduxjs/toolkit';

export const AUTH_REDUCER = 'authentication';

const authentication = createSlice({
    name: AUTH_REDUCER,
    initialState: {
        token: '',
        shareManagerInfo: {}
    },
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload;
            console.log('addToken', action);
        },
        removeToken: (state, action) => {
            state.token = '';
        }
    }
});

export const addToken = authentication.actions.addToken;
export const removeToken = authentication.actions.removeToken;
export default authentication.reducer;