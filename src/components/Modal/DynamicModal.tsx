import Modal from "@mui/material/Modal";
import IncomeModalMode from "./modes/IncomeModalMode";
import ExpenseModalMode from "./modes/ExpenseModalMode";

import { IncomeModalProps, ExpenseModalProps } from "../../types";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface DynamicModalProps {
  mode: "income" | "expense";
  open: boolean;
  onClose: Function;
  addIncome: Function;
  addExpense: Function;
}

export default function DynamicModal({
  mode,
  open,
  onClose,
  addIncome,
  addExpense,
}: DynamicModalProps) {
  return (
    <Modal open={open}>
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
