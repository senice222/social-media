import {Children} from "../interfaces/ProtectedRouteI.ts";
import Header from "../components/Header/Header.tsx";

const Layout = ({children}: Children) => {


    return (
        <>
            <Header />
            1
            {children}
        </>
    );
};

export default Layout;
