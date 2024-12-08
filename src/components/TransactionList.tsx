import { useAppContext } from "../hooks/useAppContext.tsx";
import { Transaction } from "../types.ts";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import incomeTransactionIcon from "../assets/incomeTransaction.svg";
import expenseTransactionIcon from "../assets/expenseTransaction.svg";

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const { appState } = useAppContext();

  const transactionElements = transactions.map((transactionItem) => {
    return (
      <li key={transactionItem.id} className="transaction">
        <img
          alt=""
          className={`transaction__icon  ${
            transactionItem.type === "income"
              ? "transaction__icon_income"
              : "transaction__icon_expense"
          }`}
          src={
            transactionItem.type === "income"
              ? incomeTransactionIcon
              : expenseTransactionIcon
          }
        />
        <div className="transaction__text-box">
          <Typography
            className="transaction__type"
            sx={{ fontWeight: "bold" }}
            variant="h6"
          >
            {transactionItem.category.charAt(0).toUpperCase() +
              transactionItem.category.slice(1)}
          </Typography>
          <Typography className="transaction__date">
            {`${dayjs(transactionItem.date).format("D MMM")}`}
          </Typography>
        </div>

        <p className="transaction__value">
          {transactionItem.type === "income"
            ? `+${appState.currency}${transactionItem.value}`
            : `-${appState.currency}${transactionItem.value}`}
        </p>
      </li>
    );
  });

  return (
    <ul className="statistics__transactions-list">{...transactionElements}</ul>
  );
}

export default TransactionList;
