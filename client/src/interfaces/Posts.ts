import {User, UserProps} from "./Auth";

export interface Post {
  _id: string;
  content: string;
  likes?: Likes[];
  comments: Comment[];
  urls: string[];
  owner: User;
  createdAt: string;
}
export interface Likes {
  id: string;
}
export interface CreatedPost {
  _id: string;
  description: string;
  urls: string[];
  likes: Likes[];
  comments: Comment[];
  owner: string;
}
export interface FunctionArguments {
  page: number;
  perPage: number;
}

export interface InitialState {
  posts: Post[];
  currentPage: number | string;
  totalPosts: number;
  totalPages: number;
}

export interface ContentItemProps extends Post {
    user?: User | null
}
export interface CreatePostProps extends UserProps {
  currentPage: number
}