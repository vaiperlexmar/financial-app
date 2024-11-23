import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "./hooks/useAppContext";

import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Settings from "./routes/Settings";
import Statistics from "./routes/Statistics";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { appState, setAppState } = useAppContext();

  useEffect(() => {
    if (appState.user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
