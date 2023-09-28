import {Children} from "../interfaces/ProtectedRouteI.ts";
import Header from "../components/Header/Header.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import Footer from "../components/Footer/Footer.tsx";

const Layout = ({children}: Children) => {


    return (
        <>
            <Header />
            <Sidebar>
                {children}
            </Sidebar>
            <Footer />
        </>
    );
};

export default Layout;
