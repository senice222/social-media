import {Tabs} from "antd";
import LoginForm from "../../components/auth/LoginForm.tsx";
import RegisterForm from "../../components/auth/RegisterForm.tsx";

const AuthPage = () => {
    return (
        <>
            <main style={{ width: 400, margin: "150px auto" }}>
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
            </main>
        </>
    );
};

export default AuthPage;
