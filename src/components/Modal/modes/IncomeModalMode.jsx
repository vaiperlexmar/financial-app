import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

export default function IncomeModalMode({ boxStyle, addIncome, onClose }) {
  const [incomeValue, setIncomeValue] = useState(0);
  const [incomeType, setIncomeType] = useState("job salary");

  const incomeTypesArr = [
    "job salary",
    "freelance income",
    "rental income",
    "dividends",
    "interest from savings",
    "capital gains from investments",
    "business profits",
    "sales commissions",
    "royalties",
    "pension payments",
  ];

  function handleNewIncomeEntry() {
    addIncome(incomeValue);
    onClose();
  }

  function handleIncomeTypeChange(event) {
    setIncomeType(event.target.value);
  }

  return (
    <Box sx={boxStyle}>
      <Typography
        align="center"
        variant="h4"
        component="h2"
        marginBottom={"1rem"}
      >
        Make income entity
      </Typography>

      <form>
        <div>
          <TextField
            id="income-input"
            className="input"
            variant="outlined"
            label="Income amount"
            size="small"
            type="number"
            onChange={(e) => setIncomeValue(e.target.value)}
          />
        </div>
        <FormControl fullWidth>
          <TextField
            className="input"
            id="income-type-select"
            value={incomeType}
            label="Income type"
            size="small"
            select
            onChange={handleIncomeTypeChange}
          >
            {incomeTypesArr.map((type, index) => {
              return (
                <MenuItem value={type} key={index}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
      </form>

      <Button
        className="MuiButtonBase-root_pink"
        variant="contained"
        onClick={handleNewIncomeEntry}
      >
        Add
      </Button>
    </Box>
  );
}
