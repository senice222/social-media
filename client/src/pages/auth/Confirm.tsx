import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import * as Api from '../../api'
import {notification} from "antd";

const Confirm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const navigate = useNavigate()

    useEffect(() => {
        const confirmUser = async (token: string) => {
            try {
                await Api.auth.confirm(token);
                notification.success({
                    message: "You successfully confirmed.",
                    description: "Redirecting to the home page...",
                    duration: 1,
                });
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (e) {
                console.log(e);
            }
        };
        token ? confirmUser(token) : new Error('something went wrong');
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <h1>Redirecting...</h1>
        </div>

    );
};

export default Confirm;
