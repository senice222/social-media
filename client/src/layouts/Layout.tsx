import {FC} from 'react'
import {Children} from "../interfaces/ProtectedRoute";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const Layout: FC<Children> = ({children, user}) => {
    return (
        <>
            <Header user={user}/>
            <Sidebar>
                {children}
            </Sidebar>
            <Footer/>
        </>
    );
};

export default Layout;
