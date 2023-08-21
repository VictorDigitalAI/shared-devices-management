import {createSlice} from '@reduxjs/toolkit';
import {SharedDeviceDto} from '../models/shared.models';

export const SHARED_REDUCER = "sharedDevices";

const sharedDevices = createSlice({
    name: SHARED_REDUCER,
    initialState: {
        sharedDevices: [] as SharedDeviceDto[]
    },
    reducers: {
        addSharedDevice: (state, action) => {
            state.sharedDevices.push(action.payload);
        },
        removeSharedDevice: (state, action) => {
            const index = state.sharedDevices.findIndex(d => d.deviceId === action.payload);
            if (index > -1) {
                state.sharedDevices.splice(index, 1);
            }
        }
    }
});

export const addSharedDevice = sharedDevices.actions.addSharedDevice;
export const removeSharedDevice = sharedDevices.actions.removeSharedDevice;
export default sharedDevices.reducer;