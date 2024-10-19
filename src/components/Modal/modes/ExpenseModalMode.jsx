import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function ExpenseModalMode({ boxStyle, addExpense, onClose }) {
  const [expenseValue, setExpenseValue] = useState();

  function handleNewIncomeEntry() {
    addExpense(expenseValue);
    onClose()
  }

  return (
    <Box sx={boxStyle}>
      <Typography align="center" variant="h4" component="h2">
        Make expense entity
      </Typography>

      <form>
        <Typography align="center" variant="body2" component="p">
          Type amount of expense
        </Typography>

        <TextField
          id="expense-input"
          variant="outlined"
          size="small"
          type="number"
          onChange={e => setExpenseValue(e.target.value)}
        />
      </form>

      <Button color="primary" variant="contained" onClick={handleNewIncomeEntry}>
        Add
      </Button>
    </Box>
  );
}
