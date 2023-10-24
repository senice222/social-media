import {User} from "./AuthI.ts";

export interface ConversationI {
    _id: string;
    members: Array<string>
}

export interface ConversationProps {
    conversation: ConversationI;
    currentUser: User | null
}