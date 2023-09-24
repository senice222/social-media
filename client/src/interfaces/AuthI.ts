import {CreatedPost} from "./PostsI.ts";

export interface User {
    _id: string
    email: string
    username: string
    password: string
    createdPosts: CreatedPost[]
    status: string
    avatar: string
    chats: any[]
}

export interface IReadableUser extends User {
    accessToken?: string
}


export interface RegisterAndLogin {
    data: IReadableUser | string | null;
    status: 'loading' | 'success' | 'error' | null
}


export interface GetMeData {
    user: User | null,
    status: 'loading' | 'success' | 'error' | null
}
export interface GetUserByHook {
    currentUser: User | null
}