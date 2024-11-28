import { createContext, useReducer, PropsWithChildren } from "react";
import { Transaction } from "./types";
import { User } from "firebase/auth";

interface AppState {
  balance: number;
  user: User | null;
  incomeAmount: number;
  expenseAmount: number;
  transactionsHistory: Transaction[];
  currency: string;
}

interface AppAction {
  type: string;
  payload?: any;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const initialState: AppState =
  localStorage.getItem("appState") !== null
    ? JSON.parse(localStorage.getItem("appState") as string)
    : {
        balance: 0,
        user: null,
        incomeAmount: 0,
        expenseAmount: 0,
        transactionsHistory: [],
        currency: "$",
      };

function appReducer(state: AppState, action: AppAction) {
  let newStateValue;
  switch (action.type) {
    case "addIncome":
      newStateValue = {
        ...state,
        balance: state.balance + (action["payload"]["value"] || 0),
        incomeAmount: state.incomeAmount + (action["payload"]["value"] || 0),
        transactionsHistory: [...state.transactionsHistory, action["payload"]],
      };
      localStorage.setItem("appState", JSON.stringify(newStateValue));
      return newStateValue;

    case "addExpense":
      newStateValue = {
        ...state,
        balance: state.balance - (action["payload"]["value"] || 0),
        expenseAmount:
          state.expenseAmount + (action["payload"]["expenseAmount"] || 0),
        transactionsHistory: [...state.transactionsHistory, action["payload"]],
      };
      localStorage.setItem("appState", JSON.stringify(newStateValue));
      return newStateValue;

    case "auth":
      newStateValue = { ...state, user: action.payload };
      localStorage.setItem("appState", JSON.stringify(newStateValue));
      return newStateValue;
    default:
      throw new Error("Unknown action type");
  }
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
