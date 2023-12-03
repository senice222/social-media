import {MutableRefObject, useState} from 'react'
import { Conv } from '../interfaces/Conversation'
import { Socket } from 'socket.io-client'
import { User } from '../interfaces/Auth'
import { OneMessage } from '../interfaces/Message'
import * as Api from '../api/index'
import { SendMessagePromise } from '../interfaces/Chat'

export const useSendMessage = (socket: MutableRefObject<Socket | undefined>, user: User | null): SendMessagePromise => {
	const [newMessage, setNewMessage] = useState<string>('')
	const [currentChat, setCurrentChat] = useState<Conv>()
	const [messages, setMessages] = useState<OneMessage[]>([])

	const handleSendMessage = async () => {
		const message = {
			conversationId: currentChat?._id,
			text: newMessage,
			sender: user?._id,
			senderAvatar: user?.avatar,
		}
		const receiverId = currentChat?.members.find(member => member !== user?._id)
	
		if (message.text.trim() !== '') {
			socket.current?.emit('sendMessage', {
				senderId: user?._id,
				receiverId,
				text: newMessage,
			})
		}
	
		try {
			if (message.text.trim() !== '') {
				const data = await Api.messages.sendMessage(message)
				setMessages([...messages, data])
				setNewMessage('')
			}
		} catch (e) {
			console.log(e)
		}
	}


	return {messages, setMessages, newMessage, setNewMessage, currentChat, setCurrentChat, handleSendMessage}
}	