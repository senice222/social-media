import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthDto, LoginDto} from "../../../../api/auth/auth.dto";
import * as Api from "../../../../api";

export const registerUser = createAsyncThunk('Auth/registerUser', async (values: AuthDto) => {
    const response = await Api.auth.register(values)
    return response
});

export const loginUser = createAsyncThunk('Auth/loginUser', async (values: LoginDto) => {
    const response = await Api.auth.login(values)
    return response
});