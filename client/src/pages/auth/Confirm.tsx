import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import * as Api from '../../api'
import {notification} from "antd";
import Cookies from "js-cookie";

const Confirm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const navigate = useNavigate()

    useEffect(() => {
        const confirmUser = async (token: string | null) => {
            try {
                if (token) {
                    await Api.auth.confirm(token);
                    Cookies.set('token', token);
                    notification.success({
                        message: "You successfully confirmed.",
                        description: "Redirecting to the home page...",
                        duration: 1.5,
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                } else {
                    throw new Error('Something went wrong')
                }
            } catch (e) {
                console.log(e);
            }
        };
        confirmUser(token);
    }, []);


    return (
        <div>
            <p>123</p>
        </div>
    );
};

export default Confirm;
