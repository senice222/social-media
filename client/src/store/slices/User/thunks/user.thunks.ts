import {createAsyncThunk} from "@reduxjs/toolkit";
import * as Api from "../../../../api";

export const getMe = createAsyncThunk('/getMe', async () => {
    return await Api.user.getMe()
})