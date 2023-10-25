import axios from "../../core/axios.ts";
import {SendMessage} from "../../interfaces/Message.ts";

export const getMessages = async (convId: string) => {
    const {data} = await axios.get(`message/${convId}`)
    return data
}

export const sendMessage = async (message: SendMessage) => {
    const {data} = await axios.post('message/send', message)
    return data
}