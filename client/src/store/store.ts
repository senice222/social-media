import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from "./slices/Auth/AuthSlice.ts";
import PostsSlice from "./slices/Posts/PostsSlice.ts";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        posts: PostsSlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

