import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthDto, LoginDto} from "../../../../api/auth/auth.dto";
import * as Api from "../../../../api";

export const registerUser = createAsyncThunk('Auth/registerUser', async (values: AuthDto) => {
    await Api.auth.register(values)
});

export const loginUser = createAsyncThunk('Auth/loginUser', async (values: LoginDto) => {
    await Api.auth.login(values)
});