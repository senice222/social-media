import axios from "../../core/axios.ts";

export const getAllUserFriends = async () => {
    return (await axios.get('friends')).data
}