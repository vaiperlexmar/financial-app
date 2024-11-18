import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppProvider";

import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Settings from "./routes/Settings";
import Statistics from "./routes/Statistics";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state: appState, dispatch: setAppState } = useContext(AppContext);

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
