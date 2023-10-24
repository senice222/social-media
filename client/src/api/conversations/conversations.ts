import axios from "../../core/axios.ts";

export const getUserConversations = async () => {
    const {data} = await axios.get('conversations')
    return data
}