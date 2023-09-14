import {AnyAction, createAsyncThunk, Dispatch} from '@reduxjs/toolkit';
import axios from '../../../core/axios.ts';
import { setPosts, setCurrentPage, setTotalPosts, setTotalPages } from './PostsSlice.ts';
import {FunctionArguments} from "../../../interfaces/PostsI.ts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ page, perPage }: FunctionArguments) => {
    const response = await axios.get(`posts/getPaginatedPosts?page=${page}&perPage=${perPage}`);
    return response.data;
});

export const loadPosts = ({ page, perPage }: FunctionArguments) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(setCurrentPage(page));
        const {data} = await axios.get(`posts/getPaginatedPosts?page=${page}&perPage=${perPage}`);
        dispatch(setPosts(data.posts));
        dispatch(setTotalPosts(data.totalPosts));
        dispatch(setTotalPages(data.totalPages));
    } catch (error) {
        console.error('Error loading posts', error);
    }
};
