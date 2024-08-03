import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        login: {
            isFetching: false, 
            error: false,
        },
        userInfo : {
            isLoading : false, 
            data : null , 
            error : null,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true; 
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false; 
            state.login.customer = action.payload;
            state.login.error = false;
        },
        loginError: (state) => {
            state.login.isFetching = false; 
            state.login.error = true;
        },
        getInfoUserRequest : (state) => {
            state.userInfo.isLoading = true; 
        },
        getInfoUserSuccess : (state , action) => {
            const { data } = action.payload;
            state.userInfo.isLoading = false; 
            state.userInfo.data = data; 
        },
        getInfoUserError : (state) => {
            state.userInfo.isLoading = false; 
        },
    },
});

export const { loginStart, loginSuccess, loginError  , getInfoUserRequest , getInfoUserSuccess, getInfoUserError} = customerSlice.actions;
export default customerSlice.reducer;
