import React from "react";
import Modal from "@mui/material/Modal";
import IncomeModalMode from "./modes/IncomeModalMode";
import ExpenseModalMode from "./modes/ExpenseModalMode";

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

export default function DynamicModal({ mode, open, onClose, setBalance, balance }) {

  function addIncome(value) {
    const newBalanceValue = balance + +value;
    setBalance(newBalanceValue)
  }

  function addExpense(value) {
    const newBalanceValue = balance - value;
    setBalance(newBalanceValue)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <>
        {mode === "income" ? (
          <IncomeModalMode boxStyle={style} addIncome={addIncome} onClose={onClose}/>
        ) : mode === "expense" ? (
          <ExpenseModalMode boxStyle={style} addExpense={addExpense} onClose={onClose} />
        ) : null}
      </>
    </Modal>
  );
}
