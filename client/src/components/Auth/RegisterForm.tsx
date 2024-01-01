import styles from '../../pages/auth/Auth.module.scss'
import {Button, Form, Input, notification, Upload, UploadFile, UploadProps} from "antd";
import {useState} from "react";
import { UploadOutlined } from '@ant-design/icons';
import {AuthDto} from "../../api/auth/auth.dto";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {registerUser} from "../../store/slices/Auth/thunks/auth.thunks";

const RegisterForm = () => {
    const [fileList, setFileList] = useState<UploadFile[]>()
    const dispatch = useAppDispatch()

    const onSubmit = async (values: AuthDto) => {
        try {
            dispatch(registerUser(values));
            notification.success({
                message: "You successfully created your account.",
                description: "Confirm your account on E-Mail",
                duration: 2.5
            })
        } catch (e) {
            console.log(e)
        }
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList];
        setFileList(newFileList);
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
                            message: "Enter your username email",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Enter your username",
                        },
                    ]}
                >
                    <Input />
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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Avatar"
                    name="avatar"
                    rules={[
                        {
                            required: true,
                            message: "Enter your avatar",
                        },
                    ]}
                >
                    <Upload onChange={handleChange} maxCount={1} fileList={fileList}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;
