import { SxProps } from "@mui/material";
import React from "react";

export interface Transaction {
  id: string;
  type: string;
  category: string;
  value: number;
  date: Date;
}

export interface ModalProps {
  boxStyle: SxProps;
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IncomeModalProps extends ModalProps {
  addIncome: ({}: Transaction) => void;
}

export interface ExpenseModalProps extends ModalProps {
  addExpense: ({}: Transaction) => void;
}

export type TransactionHandler = (transaction: Transaction) => void;

export type CloseModalHandler = () => void;
