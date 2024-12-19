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
import dayjs, { Dayjs } from "dayjs";
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
  const [expenseDate, setExpenseDate] = useState<Dayjs>(dayjs());

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
        component="h2"
        marginBottom={"1rem"}
        variant="h4"
      >
        Make expense entity
      </Typography>

      <ErrorEl animationClass={errorAnimation} isVisible={errorVisible}>
        {errorMessage}
      </ErrorEl>

      <form>
        <div>
          <TextField
            fullWidth
            required
            className="input"
            id="expense-input"
            label="Expense amount"
            margin="dense"
            size="small"
            type="number"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setExpenseValue(Number(e.target.value))
            }
          />
        </div>
        <FormControl fullWidth>
          <TextField
            select
            className="input"
            id="expense-type-select"
            label="Expense type"
            margin="dense"
            size="small"
            value={expenseType}
            onChange={handleExpenseTypeChange}
          >
            {expenseTypesArr.map((type, index) => {
              return (
                <MenuItem key={index} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl fullWidth margin="dense" size="small">
            <DatePicker
              disableFuture
              defaultValue={dayjs(new Date())}
              onChange={(newValue) => setExpenseDate(dayjs(newValue))}
            />
          </FormControl>
        </LocalizationProvider>
      </form>

      <Button
        className="MuiButtonBase-root_pink"
        disabled={!expenseValue}
        variant="contained"
        onClick={handleNewExpenseEntry}
      >
        Add
      </Button>
    </Box>
  );
}
