import * as Api from "../api";
import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {Conv} from "../interfaces/Conversation.ts";
import {OneMessage} from "../interfaces/Message.ts";
import {io, Socket} from "socket.io-client";
import {SocketUser} from "../interfaces/Chat.ts";

export const getUserConv = async (setConversation: Dispatch<SetStateAction<never[]>>) => {
    try {
        const data = await Api.conversation.getUserConversations()
        setConversation(data)
    } catch (e) {
        console.log(e)
    }
}

export const getMessages = async (currentChat: Conv | undefined, setMessages: Dispatch<SetStateAction<OneMessage[]>>) => {
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
    setArrivalMessage: Dispatch<any>
) => {

    socket.current = io('http://localhost:5001')
    socket.current.on("getUsers", (users) => {
        console.log(users)
        setOnlineUsers(users)
    });
    socket.current?.on("getMessage", (data) => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text
        })
    })
};