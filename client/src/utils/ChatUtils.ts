import {Dispatch, MutableRefObject, SetStateAction} from 'react'
import {Socket, io} from 'socket.io-client'
import * as Api from '../api'
import {SocketUser} from '../interfaces/Chat'
import {Conv} from '../interfaces/Conversation'
import {OneMessage} from '../interfaces/Message'
import {User} from "../interfaces/Auth.ts";

export const getUserConv = async (setConversation: Dispatch<SetStateAction<never[]>>) => {
    try {
        const data = await Api.conversation.getUserConversations()
        setConversation(data)
    } catch (e) {
        console.log(e)
    }
}

export const getMessages = async (
    currentChat: Conv | undefined,
    setMessages: Dispatch<SetStateAction<OneMessage[]>>
) => {
    try {
        const data = await Api.messages.getMessages(currentChat ? currentChat._id : '')
        setMessages(data)
    } catch (e) {
        console.log(e)
    }
}
export const setupSocket = (
    socket: MutableRefObject<Socket | undefined>,
    setOnlineUsers: Dispatch<SetStateAction<SocketUser[] | undefined>>,
    setArrivalMessage: Dispatch<any>,
    user: User
) => {
    socket.current = io('http://localhost:5000')
    socket.current?.emit('addUser', user._id);

    socket.current.on('getUsers', users => {
        console.log(users)
        setOnlineUsers(users)
    })
    socket.current?.on('getMessage', data => {
        console.log(data)
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
        })
    })

}
