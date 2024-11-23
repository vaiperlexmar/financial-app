import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAppContext } from "../hooks/useAppContext";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { appState, setAppState } = useAppContext();

  if (!appState.user) {
    return <Navigate to="/login" />;
  }

  return children;
};
