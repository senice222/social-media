import {AuthDto} from "./auth.dto.ts";
import axios from "../../core/axios.ts";
import Cookies from "js-cookie";

export const register = async (values: AuthDto) => {
    const formData = new FormData();
    formData.append("email", values.email)
    formData.append("username", values.username)
    formData.append("password", values.password)
    formData.append("avatar", values.avatar.file.originFileObj)

    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    };

    try {
        const { data } = await axios.post('auth/signUp', formData, config)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const confirm = async (token: string) => {
    const {data} = await axios.get('auth/confirm', {
        params: {
            token: token,
        },
    })
    Cookies.set('token', token);
    return data
}