import { FC, Fragment, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import ChatOnline from '../../components/ChatOnline/ChatOnline.tsx'
import Conversation from '../../components/Conversations/Conversation.tsx'
import Message from '../../components/Message/Message.tsx'
import VideoCall from '../../components/VideoCall/VideoCall'
import { DirectProps } from '../../interfaces/Auth.ts'
import { SocketUser } from '../../interfaces/Chat.ts'
import { OneMessage } from '../../interfaces/Message.ts'
import Layout from '../../layouts/Layout.tsx'
import { getMessages, getUserConv, setupSocket } from '../../utils/ChatUtils.ts'
import style from './Direct.module.scss'
import { useSendMessage } from '../../hooks/useSendMessage.ts'

const Direct: FC<DirectProps> = ({ user, isLoading }) => {
	const [conversation, setConversation] = useState([])
	const [arrivalMessage, setArrivalMessage] = useState<any>()
	const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>()
	const socket = useRef<Socket>()
	const {
		messages, 
		setMessages, 
		newMessage,
		setNewMessage, 
		currentChat, 
		setCurrentChat, 
		handleSendMessage
	} = useSendMessage(socket, user)

	useEffect(() => {
		setupSocket(socket, setOnlineUsers, setArrivalMessage)
	}, [])

	useEffect(() => {
		if (
			arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender)
		) {
			setMessages(prev => [...prev, arrivalMessage])
		}
	}, [arrivalMessage, currentChat])

	useEffect(() => {
		if (!isLoading) {
			socket.current?.emit('addUser', user?._id)
		}
	}, [user, isLoading])

	useEffect(() => {
		getUserConv(setConversation)
	}, [])

	useEffect(() => {
		getMessages(currentChat, setMessages)
	}, [currentChat])

	const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	return (
		<Layout user={user}>
			<div className={style.directContainer}>
				<div className={style.chatMenuWrapper}>
					<input
						type='text'
						placeholder={'Search for friends'}
						className={style.chatMenuInput}
					/>
					{conversation.map((conv, i: number) => (
						<div onClick={() => setCurrentChat(conv)} key={i}>
							<Conversation conversation={conv} currentUser={user} />
						</div>
					))}
				</div>
				<div className={style.chatBoxWrapper}>
					{currentChat && (
						<VideoCall currentChat={currentChat} currentUser={user} />
					)}
					{currentChat ? (
						<>
							<div className={style.chatBoxTop}>
								{messages.map((m: OneMessage, i: number) => (
									<Fragment key={i}>
										<Message message={m} own={m.sender === user?._id} />
									</Fragment>
								))}
							</div>
							<div className={style.chatBoxBottom}>
								<textarea
									className={style.chatMessageInput}
									placeholder={'write something..'}
									value={newMessage}
									onChange={e => setNewMessage(e.target.value)}
									onKeyDown={handleTextareaKeyDown}
								></textarea>
								<button
									className={style.submitButton}
									onClick={handleSendMessage}
								>
									Send
								</button>
							</div>
						</>
					) : (
						<span className={style.noConversationText}>
							Open a conversation to start chat
						</span>
					)}
				</div>
				<div className={style.chatOnlineWrapper}>
					<div className={style.chatOnline}>
						<ChatOnline
							onlineUsers={onlineUsers}
							currentUserId={user?._id}
							setCurrentChat={setCurrentChat}
						/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Direct
