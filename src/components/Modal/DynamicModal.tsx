import Modal from "@mui/material/Modal";
import IncomeModalMode from "./modes/IncomeModalMode";
import ExpenseModalMode from "./modes/ExpenseModalMode";

import { CloseModalHandler, TransactionHandler } from "../../types";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  backgroundColor: "#fff",
  boxShadow: 24,
  p: 4,
};

interface DynamicModalProps {
  mode: "income" | "expense";
  open: boolean;
  onClose: CloseModalHandler;
  addIncome: TransactionHandler;
  addExpense: TransactionHandler;
}

export default function DynamicModal({
  mode,
  open,
  onClose,
  addIncome,
  addExpense,
}: DynamicModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <>
        {mode === "income" ? (
          <IncomeModalMode
            boxStyle={style}
            addIncome={addIncome}
            onClose={onClose}
          />
        ) : mode === "expense" ? (
          <ExpenseModalMode
            boxStyle={style}
            addExpense={addExpense}
            onClose={onClose}
          />
        ) : null}
      </>
    </Modal>
  );
}
