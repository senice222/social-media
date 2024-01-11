import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RegisterAndLogin} from "../../../interfaces/Auth";
import {loginUser, registerUser} from "./thunks/auth.thunks";

const initialState: RegisterAndLogin = {
    data: null,
    status: "success",
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // user register
            .addCase(registerUser.pending, (state) => {
                state.data = null;
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.data = action.payload;
                state.status = "success"; // Update the status as needed
            })
            .addCase(registerUser.rejected, (state) => {
                state.data = null;
                state.status = "error";
            });
        // user login
        builder
            .addCase(loginUser.pending, (state) => {
                state.data = null;
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.data = action.payload;
                state.status = "success"; // Update the status as needed
            })
            .addCase(loginUser.rejected, (state) => {
                state.data = null;
                state.status = "error";
            });
    },
});

export default UserSlice.reducer;
