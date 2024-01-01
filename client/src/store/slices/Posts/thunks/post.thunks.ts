import {AnyAction, Dispatch} from "@reduxjs/toolkit";
import axios from "../../../../core/axios";
import {
    setPosts,
    setCurrentPage,
    setTotalPosts,
    setTotalPages,
} from "../PostsSlice";
import {FunctionArguments} from "../../../../interfaces/Posts";

export const loadPosts =
    ({page, perPage}: FunctionArguments) =>
        async (dispatch: Dispatch<AnyAction>) => {
            try {
                dispatch(setCurrentPage(page));
                const {data} = await axios.get(
                    `posts/getPaginatedPosts?page=${page}&perPage=${perPage}`
                );
                dispatch(setPosts(data.posts));
                dispatch(setTotalPosts(data.totalPosts));
                dispatch(setTotalPages(data.totalPages));
            } catch (error) {
                console.error("Error loading posts", error);
            }
        };
