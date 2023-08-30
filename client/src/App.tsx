import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/App.scss'
import Auth from "./pages/auth/Auth.tsx";
import Confirm from "./pages/auth/Confirm.tsx";
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Home from "./pages/Home.tsx";
import {ProtectedRouteI} from "./interfaces/ProtectedRouteI.ts";

function App() {

    const ProtectedRoute = ({ children }: ProtectedRouteI) => {
        const token = Cookies.get('token')

        if (!token) {
            return <Navigate to="/auth" />;
        }
        return children
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/auth'} element={<Auth />}/>
                <Route path={"/auth/confirm"} element={<Confirm />} />

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
