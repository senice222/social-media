import {User} from "./AuthI.ts";

export interface Post {
    _id: string,
    content: string,
    likes: string[],
    comments: Comment[],
    urls: string[],
    owner: User,
    createdAt: string
}

export interface FunctionArguments {
    page: number,
    perPage: number
}

export interface Comment {
    commentText: string,
    userId: User,
    postId: string,
    createdAt: string;
    _id: string
}
export interface CommentProps {
    _id: string;
    comments: Comment[]
}
export interface CommentPaginationProps {
    currentPage: number;
    setCurrentPage: (pageNumber: number) => void;
    totalPages: number;
}

export interface InitialState {
    posts: Post[],
    currentPage: number,
    totalPosts: number,
    totalPages: number
}