import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice'; // Đường dẫn đúng đến customerSlice

export const store = configureStore({
    reducer: {
        customer: customerReducer, // Đổi tên thành customer
    },
});
    