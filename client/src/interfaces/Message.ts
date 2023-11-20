
export interface OneMessage {
    conversationId: string;
    sender: string;
    text: string;
    _id: string;
    senderAvatar: string
    createdAt: string;
    updatedAt: string;
}
export interface MessageProps {
    message: OneMessage;
    own: boolean
}

export interface SendMessage {
    conversationId: string | undefined;
    text: string;
    sender: string | undefined
}