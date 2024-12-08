import Modal from "@mui/material/Modal";
import IncomeModalMode from "./modes/IncomeModalMode";
import ExpenseModalMode from "./modes/ExpenseModalMode";

import {
  NewCardHandler,
  CloseModalHandler,
  TransactionHandler,
} from "../../types";
import CardAddingModal from "./modes/CardAddingModal";

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
  mode: "income" | "expense" | "card";
  open: boolean;
  onClose: CloseModalHandler;
  addIncome: TransactionHandler;
  addExpense: TransactionHandler;
  addCard: NewCardHandler;
}

export default function DynamicModal({
  mode,
  open,
  onClose,
  addIncome,
  addExpense,
  addCard,
}: DynamicModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <>
        {mode === "income" ? (
          <IncomeModalMode
            addIncome={addIncome}
            boxStyle={style}
            onClose={onClose}
          />
        ) : mode === "expense" ? (
          <ExpenseModalMode
            addExpense={addExpense}
            boxStyle={style}
            onClose={onClose}
          />
        ) : mode === "card" ? (
          <CardAddingModal
            addCard={addCard}
            boxStyle={style}
            onClose={onClose}
          />
        ) : null}
      </>
    </Modal>
  );
}
