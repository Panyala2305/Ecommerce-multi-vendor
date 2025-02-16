import api from "@/app/api/route";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




interface LoginInfo {
    email: string;
    password: string;
}

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info:LoginInfo,{rejectWithValue, fulfillWithValue}) => {
        console.log(info)
        try {
            // const {data} = await api.post('/admin-login',info,{withCedentials: true})
            // console.log(data)
            const {data} = await api.post('/admin-login',info,{withCredentials: true})
            //console.log(data)
            localStorage.setItem('accessToken',data.token)
            return fulfillWithValue(data)
        } catch (error:any) {
           // console.log(error.response.data)
           return rejectWithValue(error.response.data)
        }
    }
)


export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        userInfo : ""
    },
    reducers : {
        messageClear: (state, action: { payload?: any }) => {
            state.errorMessage = '';
        }
    

    },
    extraReducers: (builder) => {
        // You can leave it empty if you're not handling async actions yet
        builder
        .addCase(admin_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_login.rejected, (state, { payload}:any) => {
            state.loader = false;
            state.errorMessage = payload.error
        })
        .addCase(admin_login.fulfilled, (state, { payload}:any) => {
            state.loader = false;
            state.successMessage = payload.message
        })

}})

export const {messageClear} = authReducer.actions
export default authReducer.reducer