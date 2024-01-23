import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ReadableUser, RegisterAndLogin} from "../../../interfaces/Auth";
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
            .addCase(registerUser.pending, (state) => {
                state.data = null;
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.data = action.payload;
                state.status = "success"; 
            })
            .addCase(registerUser.rejected, (state) => {
                state.data = null;
                state.status = "error";
            });
        builder
            .addCase(loginUser.pending, (state) => {
                state.data = null;
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<ReadableUser>) => {
                state.data = JSON.stringify(action.payload);
                state.status = "success"; 
            })
            .addCase(loginUser.rejected, (state) => {
                state.data = null;
                state.status = "error";
            });
    },
});

export default UserSlice.reducer;
