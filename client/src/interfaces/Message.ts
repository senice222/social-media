
export interface MessageI {
    conversationId: string;
    sender: string;
    text: string;
    _id: string
    createdAt: string;
    updatedAt: string;
}
export interface MessagePropsI {
    message: MessageI;
    own: boolean
}

export interface SendMessage {
    conversationId: string | undefined;
    text: string;
    sender: string | undefined
}