import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    token: null,
    loading: false,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login(state, action) {
            state.userInfo = action.payload.userInfo;
        },
    },
});

export default authSlice.reducer;
export const { login } = authSlice.actions;
