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
export interface CreatedPost {
    _id: string
    description: string
    urls: string[]
    likes: any[]
    comments: Comment[]
    owner: string
}

export interface Comment {
    commentText: string
    userId: string
    postId: string
    _id: string
    __v: number
}
export interface RegisterAndLogin {
    data: IReadableUser | string | null;
    status: 'loading' | 'success' | 'error'
}

export interface GetMeData {
    data: User | null,
    status: 'loading' | 'success' | 'error'
}
