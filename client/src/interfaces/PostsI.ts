import {User} from "./AuthI.ts";

export interface Post {
    _id: string,
    content: string,
    likes?: likes[],
    comments: Comment[],
    urls: string[],
    owner: User,
    createdAt: string
}
export interface likes {
    id: string
}
export interface CreatedPost {
    _id: string
    description: string
    urls: string[]
    likes: likes[]
    comments: Comment[]
    owner: string
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
export interface CommentItemProps {
    username: string,
    commentText: string,
    createdAt: string,
    avatar: string
}
export interface CreateCommentProps {
    setComment: (comment: string) => void,
    comment: string,
    onCreateComment: () => void;
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