import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./slices/UserSlice.ts";

export const store = configureStore({
    reducer: {
        auth: UserSlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

