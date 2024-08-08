import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk để thực hiện login
export const loginStart = createAsyncThunk(
    'customer/loginStart',
    async ({ data, callback,errorCallback }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8080/api/login/loginUser", data, {
                withCredentials: true
            });
            callback(); // Gọi callback nếu có
            return response.data; // Payload cho loginSuccess
        } catch (error) {
             if (error.response && error.response.status === 401) {
                // Xử lý lỗi 401 (Unauthorized)
                errorCallback()
                console.error("Thông tin đăng nhập không chính xác: ", error.response.data);
             }
            return rejectWithValue(error.message);
             // Payload cho loginError
        }
    }
);
const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        loginData: {
            isFetching: false, 
            error: null,
        },
        userInfo : {
            isLoading : false, 
            data : null , 
            error : null,
        }
    },
    reducers: {
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
    extraReducers: (builder) => {
        builder
            .addCase(loginStart.pending, (state) => {
                state.loginData.isFetching = true;
                state.loginData.error = null;
            })
            .addCase(loginStart.fulfilled, (state, action) => {
                state.loginData.isFetching = false;
                state.userInfo.data = action.payload;
            })
            .addCase(loginStart.rejected, (state, action) => {
                state.loginData.isFetching = false;
                state.loginData.error = action.payload;
            });
    }
});

export const { getInfoUserRequest, getInfoUserSuccess, getInfoUserError } = customerSlice.actions;
export default customerSlice.reducer;
