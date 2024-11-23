export interface Transaction {
  id: string;
  type: string;
  category: string;
  value: number;
  date: Date;
}

export interface ModalProps {
  boxStyle: React.CSSProperties;
  onClose: () => void;
}

export interface IncomeModalProps extends ModalProps {
  addIncome: ({}: Transaction) => void;
}

export interface ExpenseModalProps extends ModalProps {
  addExpense: ({}: Transaction) => void;
}
