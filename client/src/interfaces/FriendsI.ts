import {ConversationI} from './ConversationI'

export interface FriendsItemProps {
    username: string;
    avatar: string;
    userConversations: ConversationI[];
    _id: string;
}

export interface FriendRequest {
    _id: string
    fromUser: FromUser
    toUser: string
    status: string
    createdAt: string;

}

export interface FromUser {
    _id?: string
    username: string
    avatar: string;
}

export interface PendingFriendsItemProps {
    username: string
    avatar: string;
    requestId: string;
    setFriendsState: (updateFunction: (prevFriends: FriendRequest[] | undefined) => FriendRequest[] | undefined) => void;
}

export interface Status {
    status: string;
}