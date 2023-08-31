import axios from "../../core/axios.ts";
import {User} from "../../interfaces/AuthI.ts";

export const getMe = async (): Promise<User> => {
    const {data} = await axios.get('/me')
    return data
}