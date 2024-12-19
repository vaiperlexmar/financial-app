import { SxProps } from "@mui/material";
import { Dayjs } from "dayjs";
import { User } from "firebase/auth";
import React from "react";

// TO-DO Поменять нейминг для типов Type, интерфейсы I

export enum ModalModes {
  /* eslint-disable */
  INCOME = "income",
  EXPENSE = "expense",
  CARD = "card",
  SAVINGS = "savings",
  /* eslint-enable */
}

export enum ActionType {
  /* eslint-disable */
  ADDINCOME,
  ADDEXPENSE,
  ADDCARD,
  ADDSAVING,
  ADDAUTH,
  /* eslint-enable */
}

export enum StatisticsPeriod {
  /* eslint-disable */
  ALL = "all",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
  /* eslint-enable */
}

// TO-DO Saving и Debt либо в другую какую то категорию оформить либо через

export interface Transaction {
  id: string;
  category: string;
  value: number;
  date: Dayjs;
}

export interface BasicTransaction extends Transaction {
  type: "income" | "expense";
}

export interface SavingTransaction extends Transaction {
  type: "saving";
  interest: number;
}

export interface Card {
  id: string;
  vendor: string;
  balance: number;
  cardColor: string;
  last4?: string;
  cardName?: string;
}

export interface ModalProps {
  boxStyle: SxProps;
  onClose: () => void;
}

export interface DynamicModalProps {
  mode: ModalModes;
  open: boolean;
  onClose: CloseModalHandler;
  addIncome: TransactionHandler;
  addExpense: TransactionHandler;
  addCard: NewCardHandler;
}

export interface IncomeModalProps extends ModalProps {
  // eslint-disable-next-line no-unused-vars
  addIncome: (arg: BasicTransaction) => void;
}

export interface ExpenseModalProps extends ModalProps {
  // eslint-disable-next-line no-unused-vars
  addExpense: (arg: BasicTransaction) => void;
}

export interface CardModalProps extends ModalProps {
  // eslint-disable-next-line no-unused-vars
  addCard: (arg: Card) => void;
}

export type TransactionHandler = (arg: BasicTransaction) => void; // eslint-disable-line no-unused-vars

export type NewCardHandler = (arg: Card) => void; // eslint-disable-line no-unused-vars

export type CloseModalHandler = () => void;

export interface AppState {
  balance: number;
  user: User | null;
  incomeAmount: number;
  expenseAmount: number;
  transactionsHistory: BasicTransaction[];
  currency: string;
  cards: Card[];
  savings: SavingTransaction[];
  savingsAmount: number;
  debts: Transaction[];
  debtsAmount: number;
}

export type AppAction =
  | {
      type: ActionType.ADDINCOME | ActionType.ADDEXPENSE | ActionType.ADDSAVING;
      payload: Transaction;
    }
  | {
      type: ActionType.ADDCARD;
      payload: Card;
    }
  | {
      type: ActionType.ADDAUTH;
      payload: User;
    };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const isBasicTransaction = (x: any): x is BasicTransaction =>
  (x as BasicTransaction).type !== undefined;

export const isSavingTransaction = (x: any): x is SavingTransaction =>
  (x as SavingTransaction).interest !== undefined;

export type GraphProps = {
  periodTransactionsArray: BasicTransaction[];
};
