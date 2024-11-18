import { createContext, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("appState"))
  ? JSON.parse(localStorage.getItem("appState"))
  : {
      balance: 0,
      user: null,
      incomeAmount: 0,
      expenseAmount: 0,
      transactionsHistory: [],
    };

function appReducer(state, action) {
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

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
