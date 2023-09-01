import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./slices/UserSlice.ts";
import AuthSlice from "./slices/AuthSlice.ts";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

