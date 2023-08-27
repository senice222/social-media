import styles from './Auth.module.scss'
import {Button, Form, Input, Upload, UploadFile, UploadProps} from "antd";
import {useState} from "react";
import { UploadOutlined } from '@ant-design/icons';
import {AuthDto} from "../../api/auth/authDto.ts";
import {registerUser} from "../../store/slices/AuthSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";


const RegisterForm = () => {
    const [fileList, setFileList] = useState<UploadFile[]>()
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.auth.data)

    const onSubmit = async  (values: AuthDto) => {
        dispatch(registerUser(values));
    };
    console.log(data)

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
                    label="Username"
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
                            message: "Укажите пароль",
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
                            message: "Укажите вашу аватарку",
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
