import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./Pages/NotFound";

function Logout() {
  localStorage.clear();
  sessionStorage.clear();
  return <Navigate to="/login"/>
}

function RegisterAndLogout() {
  localStorage.clear();
  sessionStorage.clear();
  return <Register />;
}


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}


export default App;
