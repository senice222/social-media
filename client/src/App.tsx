import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/App.scss'
import Auth from "./pages/Auth/Auth.tsx";
import Confirm from "./pages/Auth/Confirm.tsx";
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Home from "./pages/Home.tsx";
import {Children} from "./interfaces/ProtectedRouteI.ts";

function App() {

    const ProtectedRoute = ({ children }: Children) => {
        const token = Cookies.get('token')

        if (!token) {
            return <Navigate to="/auth" />;
        }
        return children
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/Auth'} element={<Auth />}/>
                <Route path={"/Auth/confirm"} element={<Confirm />} />

                <Route
                    path={'/'}
                    index
                    element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
