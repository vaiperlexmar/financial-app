import { ChangeEvent, useState } from "react";

import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Card, CardModalProps } from "../../../types";

export default function CardAddingModal({
  boxStyle,
  onClose,
  addCard,
}: CardModalProps) {
  const [cardName, setCardName] = useState<string>();
  const [balance, setBalance] = useState<number>(0);
  const [vendor, setVendor] = useState<string>("mastercard");
  const [useLast4, setUseLast4] = useState<boolean>(false);
  const [last4, setLast4] = useState<string>("");
  const [cardColor, setCardColor] = useState("black");
  const vendorsArr: string[] = ["mastercard", "visa", "mir"];

  let isNotCompleteForm;

  if (useLast4) {
    if (
      isNaN(Number(last4)) ||
      (last4 !== undefined ? last4.length < 4 : false)
    ) {
      isNotCompleteForm = true;
    }
  }

  function handleBalanceInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    const cleanedNums = onlyNums.startsWith("0") ? onlyNums.slice(1) : onlyNums;
    setBalance(Number(cleanedNums));
  }

  function handleCardVendor(event: ChangeEvent<HTMLInputElement>) {
    setVendor(event.target.value);
  }

  function handleNewCard() {
    const newCardObject: Card = {
      id: self.crypto.randomUUID(),
      vendor,
      balance,
      cardColor,
    };

    if (last4) {
      newCardObject["last4"] = last4;
    } else {
      newCardObject["cardName"] = cardName;
    }

    addCard(newCardObject);
    onClose();
  }

  return (
    <Box sx={boxStyle}>
      <Typography
        align="center"
        component="h2"
        marginBottom={"1rem"}
        variant="h4"
      >
        Add new card
      </Typography>

      <form>
        {!useLast4 && (
          <FormControl fullWidth>
            <TextField
              required
              className="input"
              id="card-name-input"
              label="Type card name"
              margin="dense"
              size="small"
              variant="outlined"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCardName(e.target.value)
              }
            />
          </FormControl>
        )}

        {useLast4 && (
          <FormControl fullWidth>
            <TextField
              required
              className="input"
              id="card-balance-input"
              inputProps={{
                maxLength: 4,
              }}
              label="Type card last 4 numbers"
              margin="dense"
              size="small"
              variant="outlined"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLast4(e.target.value);
              }}
            />
          </FormControl>
        )}

        <FormControl fullWidth>
          <TextField
            required
            className="input"
            id="card-balance-input"
            label="Type card balance"
            margin="normal"
            size="small"
            value={balance ?? ""}
            variant="outlined"
            onChange={(e) => handleBalanceInput(e)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            select
            className="input"
            id="card-vendor-select"
            label="Vendor type"
            margin="normal"
            size="small"
            value={vendor}
            onChange={handleCardVendor}
          >
            {vendorsArr.map((type, index) => {
              return (
                <MenuItem key={index} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>

        <FormControl>
          <FormLabel id="card-color-group-label">Color</FormLabel>
          <RadioGroup
            row
            defaultValue="black"
            name="card-color-group"
            value={cardColor}
            onChange={(e) => setCardColor(e.target.value)}
          >
            <FormControlLabel control={<Radio />} label="Black" value="black" />
            <FormControlLabel control={<Radio />} label="White" value="white" />
          </RadioGroup>
        </FormControl>

        <FormControlLabel
          checked={useLast4}
          control={<Checkbox />}
          label={"I want to use last 4 number of card as name"}
          onChange={() => {
            setUseLast4(!useLast4);
          }}
        ></FormControlLabel>
      </form>

      <Button
        className="MuiButtonBase-root_pink"
        disabled={isNotCompleteForm}
        variant="contained"
        onClick={handleNewCard}
      >
        Add
      </Button>
    </Box>
  );
}
