import { useState, ChangeEvent } from "react";

import { IncomeModalProps } from "../../../types";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import ErrorEl from "../../ErrorEl";

export default function IncomeModalMode({
  boxStyle,
  addIncome,
  onClose,
}: IncomeModalProps) {
  const [incomeValue, setIncomeValue] = useState(0);
  const [incomeType, setIncomeType] = useState("job salary");
  const [incomeDate, setIncomeDate] = useState(new Date());
  const [errorVisible, setErrorVisible] = useState(false);

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
    if (Number(incomeValue) > 0) {
      addIncome({
        id: self.crypto.randomUUID(),
        type: "income",
        category: incomeType,
        value: Number(incomeValue),
        date: incomeDate,
      });
      onClose();
    }
  }

  function handleIncomeTypeChange(event: ChangeEvent<HTMLInputElement>) {
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

      <ErrorEl isVisible={errorVisible}>
        {Number(incomeValue) <= 0 && "Please, type correct income value"}
      </ErrorEl>

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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIncomeValue(Number(e.target.value))
            }
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
              // TO-DO ПОДУМАТЬ ЧО С ЭТИМ ПОМЕНЯТЬ
              onChange={(newValue) => setIncomeDate(newValue as any)}
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
