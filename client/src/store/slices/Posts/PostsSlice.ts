import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {InitialState, Post} from "../../../interfaces/PostsI.ts";

const initialState: InitialState = {
    posts: [], // array of posts
    currentPage: 1,
    totalPosts: 0,
    totalPages: 0
}

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload as Draft<Post[]>
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setTotalPosts(state, action: PayloadAction<number>) {
            state.totalPosts = action.payload
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload
        },
    }
})

export const { setPosts, setCurrentPage, setTotalPosts, setTotalPages } = PostsSlice.actions
export default PostsSlice.reducer