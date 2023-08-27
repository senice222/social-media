export interface Root {
    _id: string
    email: string
    username: string
    password: string
    createdPosts: CreatedPost[]
    status: string
    avatar: string
    chats: any[]
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
export interface Data {
    data: Root | null,
    status: 'loading' | 'success' | 'error'
}