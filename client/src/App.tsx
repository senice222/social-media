import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/App.scss'
import Auth from "./pages/auth/Auth.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/registration'} element={<Auth />}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App
