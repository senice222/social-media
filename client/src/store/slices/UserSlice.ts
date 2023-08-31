import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetMeData} from "../../interfaces/AuthI.ts";
import * as Api from '../../api/index.ts'

export const getMe = createAsyncThunk('/getMe', async () => {
    await Api.user.getMe()
})

const initialState: GetMeData = {
    data: null,
    status: 'success'
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get me
            .addCase(getMe.pending, (state) => {
                state.data = null
                state.status = 'loading';
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<any>) => {
                state.data = action.payload;
                state.status = 'success'; // Update the status as needed
            })
            .addCase(getMe.rejected, (state) => {
                state.data = null
                state.status = 'error';
            });
    },
})


export default UserSlice.reducer