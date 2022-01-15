import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            const payload = action.payload;
            state.userInfo = payload.userInfo;
            state.token = payload.token;
        },
        clearUserInfo(state) {
            state.userInfo = null;
            state.token = null;
        },
    },
});

export default authSlice.reducer;
export const { setUserInfo, clearUserInfo } = authSlice.actions;
