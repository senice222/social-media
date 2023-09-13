import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RegisterAndLogin} from "../../interfaces/AuthI.ts";
import * as Api from '../../api/index.ts'
import {AuthDto} from "../../api/auth/auth.dto.ts";

export const registerUser = createAsyncThunk('Auth/registerUser', async (values: AuthDto) => {
    await Api.auth.register(values)
});

const initialState: RegisterAndLogin = {
    data: null,
    status: 'success'
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // user register
            .addCase(registerUser.pending, (state) => {
                state.data = null
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.data = action.payload;
                state.status = 'success'; // Update the status as needed
            })
            .addCase(registerUser.rejected, (state) => {
                state.data = null
                state.status = 'error';
            });
    },
})


export default UserSlice.reducer