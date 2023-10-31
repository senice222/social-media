import * as Api from "../api";
import {Dispatch, SetStateAction} from "react";
import {ConversationI} from "../interfaces/ConversationI.ts";
import {MessageI} from "../interfaces/Message.ts";

export const getUserConv = async (setConversation: Dispatch<SetStateAction<never[]>>) => {
    try {
        const data = await Api.conversation.getUserConversations()
        setConversation(data)
    } catch (e) {
        console.log(e)
    }
}

export const getMessages = async (currentChat: ConversationI | undefined, setMessages: Dispatch<SetStateAction<MessageI[]>>) => {
    try {
        const data = await Api.messages.getMessages(currentChat ? currentChat._id : '')
        setMessages(data)
    } catch (e) {
        console.log(e)
    }
}