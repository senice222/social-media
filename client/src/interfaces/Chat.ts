import {ConversationI} from "./ConversationI.ts";
import {Dispatch, SetStateAction} from "react";

export interface UserOnlineProps {
    onlineUsers: never[],
    setCurrentChat: Dispatch<SetStateAction<ConversationI | undefined>>,
    currentUserId: string | undefined
}

export interface SocketUser {
    socketId: string,
    userId: string
}