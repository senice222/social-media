import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import Auth from './pages/auth/Auth.tsx'
import Confirm from "./pages/auth/Confirm.tsx";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./pages/Home.tsx";
import { Children } from "./interfaces/ProtectedRoute.ts";
import Profile from "./pages/Profile/Profile.tsx";
import Direct from "./pages/Direct/Direct.tsx";
import { useGetMe } from "./hooks/useGetMe.ts";

function App() {
    const {currentUser, isLoading} = useGetMe()

    const ProtectedRoute = ({ children }: Children) => {
        const token = Cookies.get("token");
        if (!token) {
          return <Navigate to="/auth" />;
        }
        return children
    };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/Auth"} element={<Auth />} />
        <Route path={"/Auth/confirm"} element={<Confirm />} />

        <Route
          path={"/"}
          index
          element={
            <ProtectedRoute>
              <Home user={currentUser} />
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
              <Direct user={currentUser} isLoading={isLoading}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
