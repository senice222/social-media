import axios from "../../core/axios.ts";

export const getMessages = async (convId: string) => {
    const {data} = await axios.get(`message/${convId}`)
    return data
}