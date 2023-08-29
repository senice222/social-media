import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/App.scss'
import Auth from "./pages/auth/Auth.tsx";
import Confirm from "./pages/auth/Confirm.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/auth'} element={<Auth />}/>
                <Route path={"/auth/confirm"} element={<Confirm />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App
