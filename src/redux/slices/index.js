import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import cartReducer from './cart';

export * from './auth';
export * from './cart';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export default rootReducer;
