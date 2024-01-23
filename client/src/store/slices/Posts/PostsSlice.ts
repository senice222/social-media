import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    currentPage: 1,
};

const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
}});

export const {setCurrentPage} = PostsSlice.actions;
export default PostsSlice.reducer;
