import axios from "../../core/axios.ts";

export const getUserConversations = async () => {
    const {data} = await axios.get('conversations')
    return data
}

export const getCurrentUserConversation = async (firstUserId: string, secondUserId: string) => {
    const {data} = await axios.get(`conversations/find/${firstUserId}/${secondUserId}`)
    return data
}