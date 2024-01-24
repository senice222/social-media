import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./styles/App.scss";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import {Children} from "./interfaces/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Direct from "./pages/Direct/Direct";
import {useGetMe} from "./hooks/useGetMe";
import Confirm from "./pages/Auth/Confirm";
import Auth from "./pages/Auth/Auth";
import {useEffect, useRef, useState} from "react";
import {setupSocket} from "./utils/ChatUtils";
import {SocketUser} from "./interfaces/Chat";
import {Socket} from "socket.io-client";

function App() {
    const {currentUser, isLoading} = useGetMe()
    const [arrivalMessage, setArrivalMessage] = useState<any>()
    const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>()
    const socket = useRef<Socket>()

    const ProtectedRoute = ({children}: Children) => {
        const token = Cookies.get("token");
        if (!token) {
            return <Navigate to="/auth"/>;
        }
        return children
    };

    useEffect(() => {
        if (currentUser) {
            setupSocket(socket, setOnlineUsers, setArrivalMessage, currentUser);
        }
    }, [currentUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/Auth"} element={<Auth/>}/>
                <Route path={"/Auth/confirm"} element={<Confirm/>}/>

                <Route
                    path={"/"}
                    index
                    element={
                        <ProtectedRoute>
                            <Home user={currentUser}/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={"/profile/:id"}
                    element={
                        <ProtectedRoute>
                            <Profile user={currentUser}/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={"/direct"}
                    element={
                        <ProtectedRoute>
                            <Direct user={currentUser} onlineUsers={onlineUsers}
                                    arrivalMessage={arrivalMessage} socket={socket}/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
