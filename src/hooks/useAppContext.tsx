import { useContext } from "react";
import { AppContext } from "../AppProvider";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("App must be used within an AppProvider");
  }
  const { state: appState, dispatch: setAppState } = context;
  return { appState, setAppState };
};
