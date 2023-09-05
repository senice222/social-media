import {Children} from "../interfaces/ProtectedRouteI.ts";
import Header from "../components/Header/Header.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";

const Layout = ({children}: Children) => {


    return (
        <>
            <Header />
            <Sidebar>
                {children}
            </Sidebar>
        </>
    );
};

export default Layout;
