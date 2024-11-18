import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppProvider";

export const ProtectedRoute = ({ children }) => {
  const { state: appState, dispatch: setAppState } = useContext(AppContext);

  if (!appState.user) {
    return <Navigate to="/login" />;
  }

  return children;
};
