import { Conv } from './Conversation'
import { Dispatch, SetStateAction } from 'react'
import { User } from './Auth'
import { OneMessage } from './Message'

export interface UserOnlineProps {
	onlineUsers: SocketUser[] | undefined
	setCurrentChat: Dispatch<SetStateAction<Conv | undefined>>
	currentUserId: string | undefined
}

export interface SocketUser {
	socketId: string
	userId: string
}
export interface CurrentChat {
	currentChat: Conv | undefined
	currentUser?: User | null
}

export interface SendMessagePromise {
	messages: OneMessage[];
	setMessages: Dispatch<SetStateAction<OneMessage[]>>;
	newMessage: string;
	setNewMessage: Dispatch<React.SetStateAction<string>>;
	currentChat?: Conv;
	setCurrentChat: Dispatch<React.SetStateAction<Conv | undefined>>;
  handleSendMessage: () => Promise<void>
}
