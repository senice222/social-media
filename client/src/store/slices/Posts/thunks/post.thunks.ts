import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from "../../../../core/axios.ts";
import {
  setPosts,
  setCurrentPage,
  setTotalPosts,
  setTotalPages,
} from "../PostsSlice.ts";
import { FunctionArguments } from "../../../../interfaces/Posts.ts";

export const loadPosts =
  ({ page, perPage }: FunctionArguments) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(setCurrentPage(page));
      const { data } = await axios.get(
        `posts/getPaginatedPosts?page=${page}&perPage=${perPage}`
      );
      dispatch(setPosts(data.posts));
      dispatch(setTotalPosts(data.totalPosts));
      dispatch(setTotalPages(data.totalPages));
    } catch (error) {
      console.error("Error loading posts", error);
    }
  };
