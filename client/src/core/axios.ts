import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.baseURL = "http://localhost:5000"

axios.interceptors.response.use((config) => {
    if (typeof window !== "undefined") {
        const { token } = Cookies.get();

        config.headers.Authorization = "Bearer " + token;
    }

    return config;
})