import {FC} from 'react'
import {Children} from "../interfaces/ProtectedRoute.ts";
import Header from "../components/Header/Header.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import Footer from "../components/Footer/Footer.tsx";

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
