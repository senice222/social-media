import axios from "../../core/axios";

export const getUserConversations = async () => {
    const {data} = await axios.get('conversations')
    return data
}

export const createConversation = async (senderId: string, receiverId: string) => {
    const convObj = {senderId, receiverId}
    const {data} = await axios.post('conversations/create', convObj)
    return data
}

export const getCurrentUserConversation = async (firstUserId: string, secondUserId: string) => {
    const {data} = await axios.get(`conversations/find/${firstUserId}/${secondUserId}`)
    return data
}