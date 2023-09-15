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
export interface PostWithoutId extends Omit<Post, '_id'> { }

export interface FunctionArguments {
    page: number,
    perPage: number
}

export interface Comment {
    commentText: string,
    userId: User,
    postId: string,
    _id: string
}
export interface InitialState {
    posts: Post[],
    currentPage: number,
    totalPosts: number,
    totalPages: number
}