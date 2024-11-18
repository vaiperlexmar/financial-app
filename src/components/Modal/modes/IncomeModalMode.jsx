import React from "react";
import { useState } from "react";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function IncomeModalMode({ boxStyle, addIncome, onClose }) {
  const [incomeValue, setIncomeValue] = useState(0);
  const [incomeType, setIncomeType] = useState("job salary");
  const [incomeDate, setIncomeDate] = useState(new Date());

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
    addIncome({
      id: self.crypto.randomUUID(),
      type: "income",
      category: incomeType,
      value: Number(incomeValue),
      date: `${incomeDate.getDate()} ${incomeDate.toString().slice(4, 7)}`,
    });
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
            fullWidth
            required
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl fullWidth size="small">
            <DatePicker
              defaultValue={dayjs(new Date())}
              onChange={(newValue) => setIncomeDate(newValue)}
            />
          </FormControl>
        </LocalizationProvider>
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
