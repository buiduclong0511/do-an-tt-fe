import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import cartReducer from './cart';
import orderReducer from './order';

export * from './auth';
export * from './cart';
export * from './order';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
});

export default rootReducer;
