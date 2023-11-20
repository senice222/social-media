import { User } from "./Auth.ts";

export interface Post {
  _id: string;
  content: string;
  likes?: likes[];
  comments: Comment[];
  urls: string[];
  owner: User;
  createdAt: string;
}
export interface likes {
  id: string;
}
export interface CreatedPost {
  _id: string;
  description: string;
  urls: string[];
  likes: likes[];
  comments: Comment[];
  owner: string;
}
export interface FunctionArguments {
  page: number;
  perPage: number;
}

export interface InitialState {
  posts: Post[];
  currentPage: number;
  totalPosts: number;
  totalPages: number;
}

export interface ContentItemProps extends Post {
    user: User | null
}