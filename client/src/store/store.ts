import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./slices/User/UserSlice.ts";
import AuthSlice from "./slices/Auth/AuthSlice.ts";
import PostsSlice from "./slices/Posts/PostsSlice.ts";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice,
        posts: PostsSlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

