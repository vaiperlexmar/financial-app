import React, { createContext, useReducer, PropsWithChildren } from "react";
import {
  AppState,
  AppAction,
  AppContextType,
  isBasicTransaction,
  isSavingTransaction,
  ActionType,
} from "./types";

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
        cards: [],
        savings: [],
        savingsAmount: 0,
        debts: [],
        debtsAmount: 0,
      };

function appReducer(state: AppState, action: AppAction): AppState {
  let newStateValue;
  const { type } = action;
  const data = action.payload;

  switch (type) {
    case ActionType.ADDINCOME: {
      if (isBasicTransaction(data)) {
        const { value } = data;
        newStateValue = {
          ...state,
          balance: state.balance + (value || 0),
          incomeAmount: state.incomeAmount + (value || 0),
          transactionsHistory: [...state.transactionsHistory, data],
        };
        localStorage.setItem("appState", JSON.stringify(newStateValue));
        return newStateValue;
      }
      break;
    }

    case ActionType.ADDEXPENSE: {
      if (isBasicTransaction(data)) {
        const { value } = data;

        newStateValue = {
          ...state,
          balance: state.balance - (value || 0),
          expenseAmount: state.expenseAmount + (value || 0),
          transactionsHistory: [...state.transactionsHistory, data],
        };
        localStorage.setItem("appState", JSON.stringify(newStateValue));
        return newStateValue;
      }
      break;
    }

    case ActionType.ADDSAVING:
      if (isSavingTransaction(data)) {
        const { value } = data;

        newStateValue = {
          ...state,
          savings: [...state.savings, data],
          savingsAmount: state.savingsAmount + (value || 0),
        };
        localStorage.setItem("appState", JSON.stringify(newStateValue));
        return newStateValue;
      }
      break;

    case ActionType.ADDCARD:
      if ("vendor" in data) {
        const { balance } = data;

        newStateValue = {
          ...state,
          balance: state.balance + (balance || 0),
          cards: [...state.cards, data],
        };
        localStorage.setItem("appState", JSON.stringify(newStateValue));
        return newStateValue;
      }
      break;
    case ActionType.ADDAUTH:
      newStateValue = { ...state, user: action.payload };
      localStorage.setItem("appState", JSON.stringify(newStateValue));
      return newStateValue;
    default:
      throw new Error("There is no such action type");
  }

  return { ...state };
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
