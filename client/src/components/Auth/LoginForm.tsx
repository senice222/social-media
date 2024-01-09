import styles from '../../pages/auth/Auth.module.scss'
import {Button, Form, Input, notification} from "antd";
import {LoginDto} from "../../api/auth/auth.dto";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {loginUser} from "../../store/slices/Auth/thunks/auth.thunks";
import Cookies from "js-cookie";

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [err, setErr] = useState<boolean>(false);

    const onSubmit = async (values: LoginDto) => {
        try {
            dispatch(loginUser(values)).then(() => {
                const cookieValue = Cookies.get('token');
                if (cookieValue) {
                    notification.success({
                        message: "Success!",
                        description: "You successfully entered.",
                        duration: 1.5
                    })
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                }
            });
            notification.error({
                message: "Error!",
                description: "Something went wrong.",
                duration: 1.5
            })
        } catch (e) {
            console.log(e)
            setErr(true)
        }
    };

    return (
        <div className={styles.formBlock}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                onFinish={onSubmit}
            >
                <Form.Item
                    label="E-Mail"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Enter your email",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Enter your password",
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
                {err && 'Error..'}
            </Form>
        </div>
    );
};

export default LoginForm;
