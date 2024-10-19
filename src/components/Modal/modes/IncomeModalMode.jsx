import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function IncomeModalMode({ boxStyle, addIncome, onClose }) {
  const [incomeValue, setIncomeValue] = useState(0);

  function handleNewIncomeEntry() {
    addIncome(incomeValue);
    onClose()
  }

  return (
    <Box sx={boxStyle}>
      <Typography align="center" variant="h4" component="h2">
        Make income entity
      </Typography>

      <form>
        <Typography align="center" variant="body2" component="p">
          Type amount of income
        </Typography>

        <TextField
          id="income-input"
          variant="outlined"
          size="small"
          type="number"
          onChange={e => setIncomeValue(e.target.value)}
        />
      </form>

      <Button color="primary" variant="contained" onClick={handleNewIncomeEntry} >
        Add
      </Button>
    </Box>
  );
}
