import {ConversationI} from "./ConversationI.ts";
import {Dispatch, SetStateAction} from "react";
import {User} from "./AuthI.ts";

export interface UserOnlineProps {
    onlineUsers: SocketUser[] | undefined,
    setCurrentChat: Dispatch<SetStateAction<ConversationI | undefined>>,
    currentUserId: string | undefined
}

export interface SocketUser {
    socketId: string,
    userId: string
}
export interface CurrentChatI {
    currentChat: ConversationI | undefined;
    currentUser: User | null;
}