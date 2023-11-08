import {User} from "./AuthI.ts";

export interface ConversationI {
    _id: string;
    members: string[]
}

export interface ConversationProps {
    conversation: ConversationI;
    currentUser: User | null
}