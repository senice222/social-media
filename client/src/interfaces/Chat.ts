import { Conv } from "./Conversation.ts";
import { Dispatch, SetStateAction } from "react";
import { User } from "./Auth.ts";

export interface UserOnlineProps {
  onlineUsers: SocketUser[] | undefined;
  setCurrentChat: Dispatch<SetStateAction<Conv | undefined>>;
  currentUserId: string | undefined;
}

export interface SocketUser {
  socketId: string;
  userId: string;
}
export interface CurrentChat {
  currentChat: Conv | undefined;
  currentUser: User | null;
}
