import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = "http://localhost:5000/";

axios.interceptors.request.use((config) => {
    const token = Cookies.get('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axios;
