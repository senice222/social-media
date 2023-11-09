import {ConversationI} from "./ConversationI.ts";
import {Dispatch, SetStateAction} from "react";
import {User} from "./AuthI.ts";
import {Socket} from "socket.io-client";

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
    socket: Socket;

}