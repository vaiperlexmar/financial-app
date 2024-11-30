import { ChangeEvent, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ExpenseModalProps } from "../../../types.ts";
import { useError } from "../../../hooks/useError.tsx";
import ErrorEl from "../../ErrorEl.tsx";

export default function ExpenseModalMode({
  boxStyle,
  addExpense,
  onClose,
}: ExpenseModalProps) {
  const [expenseValue, setExpenseValue] = useState<number>();
  const [expenseType, setExpenseType] = useState("housing costs");
  const [expenseDate, setExpenseDate] = useState(dayjs());

  const { errorMessage, errorVisible, errorAnimation, showError } = useError();

  const expenseTypesArr = [
    "housing costs",
    "utility bills",
    "transportation costs",
    "grocery expenses",
    "healthcare costs",
    "debt repayments",
    "educational expenses",
    "entertainment expenses",
    "travel expenses",
    "childcare expenses",
    "insurance premiums",
    "clothing and personal care",
    "savings contributions",
    "charity and donations",
    "tax payments",
    "membership fees",
    "miscellaneous costs",
  ];

  function handleNewExpenseEntry() {
    if (Number(expenseValue) > 0) {
      addExpense({
        id: self.crypto.randomUUID(),
        type: "expense",
        category: expenseType,
        value: Number(expenseValue),
        date: expenseDate,
      });
      onClose();
    } else {
      showError("Please, type correct expense value");
    }
  }

  function handleExpenseTypeChange(event: ChangeEvent<HTMLInputElement>) {
    setExpenseType(event.target.value);
  }

  return (
    <Box sx={boxStyle}>
      <Typography
        align="center"
        variant="h4"
        component="h2"
        marginBottom={"1rem"}
      >
        Make expense entity
      </Typography>

      <ErrorEl isVisible={errorVisible} animationClass={errorAnimation}>
        {errorMessage}
      </ErrorEl>

      <form>
        <div>
          <TextField
            id="expense-input"
            className="input"
            variant="outlined"
            label="Expense amount"
            size="small"
            fullWidth
            required
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setExpenseValue(Number(e.target.value))
            }
          />
        </div>
        <FormControl fullWidth>
          <TextField
            className="input"
            id="expense-type-select"
            value={expenseType}
            label="Expense type"
            size="small"
            select
            onChange={handleExpenseTypeChange}
          >
            {expenseTypesArr.map((type, index) => {
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
              onChange={(newValue) => setExpenseDate(dayjs(newValue))}
            />
          </FormControl>
        </LocalizationProvider>
      </form>

      <Button
        className="MuiButtonBase-root_pink"
        variant="contained"
        onClick={handleNewExpenseEntry}
        disabled={!expenseValue}
      >
        Add
      </Button>
    </Box>
  );
}
