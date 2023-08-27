import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Data} from "../../interfaces/AuthI.ts";
import * as Api from '../../api/index.ts'
import {AuthDto} from "../../api/auth/authDto.ts";

export const registerUser = createAsyncThunk('auth/registerUser', async (values: AuthDto) => {
    await Api.auth.register(values)
});

const initialState: Data = {
    data: null,
    status: 'success'
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.data = null
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                console.log(action.payload)
                state.data = action.payload;
                state.status = 'success'; // Update the status as needed
            })
            .addCase(registerUser.rejected, (state) => {
                state.data = null
                state.status = 'error';
            });
    },
})


export default AuthSlice.reducer