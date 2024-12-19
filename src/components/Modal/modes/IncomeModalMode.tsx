import { useState, ChangeEvent } from "react";

import { IncomeModalProps } from "../../../types";

import {
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import ErrorEl from "../../ErrorEl";
import { useError } from "../../../hooks/useError.tsx";

export default function IncomeModalMode({
  boxStyle,
  addIncome,
  onClose,
}: IncomeModalProps) {
  const [incomeValue, setIncomeValue] = useState(0);
  const [incomeType, setIncomeType] = useState("job salary");
  const [incomeDate, setIncomeDate] = useState<Dayjs>(dayjs());

  const { errorMessage, errorVisible, errorAnimation, showError } = useError();

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
    } else {
      showError("Please, type correct income value");
    }
  }

  function handleIncomeTypeChange(event: ChangeEvent<HTMLInputElement>) {
    setIncomeType(event.target.value);
  }

  return (
    <Box sx={boxStyle}>
      <Typography
        align="center"
        component="h2"
        marginBottom={"1rem"}
        variant="h4"
      >
        Make income entity
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
            id="income-input"
            label="Income amount"
            margin="dense"
            size="small"
            type="number"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIncomeValue(Number(e.target.value))
            }
          />
        </div>
        <FormControl fullWidth>
          <TextField
            select
            className="input"
            id="income-type-select"
            label="Income type"
            margin="dense"
            size="small"
            value={incomeType}
            onChange={handleIncomeTypeChange}
          >
            {incomeTypesArr.map((type, index) => {
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
              // TO-DO ПОДУМАТЬ ЧО С ЭТИМ ПОМЕНЯТЬ
              onChange={(newValue) => setIncomeDate(dayjs(newValue))}
            />
          </FormControl>
        </LocalizationProvider>
      </form>

      <Button
        className="MuiButtonBase-root_pink"
        disabled={!incomeValue}
        variant="contained"
        onClick={handleNewIncomeEntry}
      >
        Add
      </Button>
    </Box>
  );
}
