import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { JSX } from "react";

function App() {
  const { token } = useAuth();

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return token ? children : <Navigate to="/login" replace />;
  };


  return (
    <div className="flex-1 flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;