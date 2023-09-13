import {Tabs} from "antd";
import LoginForm from "../../components/Auth/LoginForm.tsx";
import RegisterForm from "../../components/Auth/RegisterForm.tsx";
import style from './Auth.module.scss'

const AuthPage = () => {
    return (
        <>
            <main className={style.mainBlock}>
                <div className={style.tabs}>
                    <Tabs
                        items={[
                            {
                                label: "Login",
                                key: "1",
                                children: <LoginForm />,
                            },
                            {
                                label: "Register",
                                key: "2",
                                children: <RegisterForm />,
                            },
                        ]}
                    />
                </div>
            </main>
        </>
    );
};

export default AuthPage;
