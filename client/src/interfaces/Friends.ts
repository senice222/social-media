import {Conv} from "./Conversation";
import {Dispatch, SetStateAction} from "react";

export interface FriendsItemProps {
    username: string;
    avatar: string;
    userConversations: Conv[];
    _id: string;
}

export interface FriendRequest {
    _id: string;
    fromUser: FromUser;
    toUser: string;
    status: string;
    createdAt: string;
}

export interface FromUser {
    _id?: string;
    username: string;
    avatar: string;
}

export interface PendingFriendsItemProps {
    username: string;
    avatar: string;
    requestId: string;
    setFriendsState:Dispatch<SetStateAction<FriendRequest[] | undefined>>
}

export interface Status {
    status: string;
}
