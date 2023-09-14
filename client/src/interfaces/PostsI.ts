import {User} from "./AuthI.ts";

export interface Post {
    _id: string
    title: string
    content: string
    likes: any[]
    comments: Comment[]
    urls: string[]
    owner: string
}
export interface FunctionArguments {
    page: number,
    perPage: number
}

export interface Comment {
    commentText: string
    userId: User
    postId: string
    _id: string
}
export interface InitialState {
    posts: Post[],
    currentPage: number,
    totalPosts: number,
    totalPages: number
}