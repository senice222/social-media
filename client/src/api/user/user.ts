import axios from "../../core/axios";

export const getUserById = async (id: string) => {
    const {data} = await axios.get(`user/getUser/${id}`);
    return data;
};

export const searchUser = async (username: string) => {
    try {
        const {data} = await axios.get(`user/search/${username}`)
        return data
    } catch (e) {
        console.log('error', e)
    }
}