import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetMeData} from "../../../interfaces/AuthI.ts";
import {getMe} from "./thunks/user.thunks.ts";

const initialState: GetMeData = {
    user: null,
    status: null
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get me
            .addCase(getMe.pending, (state) => {
                state.user = null
                state.status = 'loading';
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload;
                state.status = 'success';
            })
            .addCase(getMe.rejected, (state) => {
                state.user = null
                state.status = 'error';
            });
    },
})


export default UserSlice.reducer