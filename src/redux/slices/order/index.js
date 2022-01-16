import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder(state, { payload }) {
            state.orders = payload;
        },
        clearOrder(state) {
            state.orders = [];
        },
    },
});

export default orderSlice.reducer;
export const { setOrder } = orderSlice.actions;
