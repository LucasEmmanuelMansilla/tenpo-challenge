import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { JSX } from "react";
import { useAuthStore } from "./stores/authStore";

function App() {
  const token = useAuthStore(state => state.token);

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return token ? children : <Navigate to="/login" replace />;
  };


  return (
    <div className="flex-1 flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/home" replace /> : <LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={token ? "/home" : "/login"} replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;