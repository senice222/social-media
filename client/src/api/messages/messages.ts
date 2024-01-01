import axios from "../../core/axios";
import {SendMessage} from "../../interfaces/Message";

export const getMessages = async (convId: string) => {
    const {data} = await axios.get(`message/${convId}`)
    return data
}

export const sendMessage = async (message: SendMessage) => {
    const {data} = await axios.post('message/send', message)
    return data
}