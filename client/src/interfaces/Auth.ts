import { CreatedPost } from './Posts'
import {SocketUser} from "./Chat";

export interface User {
	_id: string
	email: string
	username: string
	password: string
	createdPosts: CreatedPost[]
	status: string
	avatar: string
	chats: any[]
	friends: User[] | []
}

export interface ReadableUser extends User {
	accessToken?: string
}

export interface DirectProps {
	user?: User | null
	arrivalMessage: any
	onlineUsers?: SocketUser[]
	socket: any
}

export interface RegisterAndLogin {
	data: ReadableUser | string | null
	status: 'loading' | 'success' | 'error' | null
}

export interface GetMeData {
	user: User | null
	status: 'loading' | 'success' | 'error' | null
}
export interface UserProps {
	user?: User | null
}

export interface GetUserByHook {
	currentUser?: User | null
	isLoading: boolean
}
