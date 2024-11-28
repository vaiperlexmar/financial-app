import { useAppContext } from "../hooks/useAppContext";
import { Typography, Button } from "@mui/material";
import Chart from "../components/Chart";
import moment from "moment";

import expenseTransactionIcon from "../assets/expenseTransaction.svg";
import incomeTransactionIcon from "../assets/incomeTransaction.svg";

export default function Statistics() {
  const { appState } = useAppContext();
  console.log(appState.transactionsHistory);

  return (
    <main className="statistics__container">
      <div className="statistics__period-selection">
        <Button className="statistics__period" variant="text">
          Day
        </Button>
        <Button className="statistics__period" variant="text">
          Week
        </Button>
        <Button className="statistics__period" variant="text">
          Month
        </Button>
        <Button className="statistics__period" variant="text">
          Year
        </Button>
      </div>
      <section className="statistics__entries">
        <div className="statistics__amount-container statistics__amount-container_black">
          <Typography variant="h4" component="p">
            {appState.currency}
            {appState.expenseAmount}
          </Typography>
          <Typography variant={"subtitle1"}>Expenses</Typography>
        </div>
        <div className="statistics__amount-container statistics__amount-container_white">
          <Typography variant="h4" component="p">
            {appState.currency}
            {appState.incomeAmount}
          </Typography>
          <Typography variant={"subtitle1"}>Income</Typography>
        </div>
      </section>
      <section className="statistics__graph">
        <Chart />
      </section>
      <section className="statistics__transactions">
        <header className="statistics__transactions-header">
          <Typography variant="h5">Transactions</Typography>
          <Typography>See all</Typography>
        </header>
        <ul className="statistics__transactions-list">
          {appState.transactionsHistory.toReversed().map((transactionItem) => {
            return (
              <li className="transaction" key={transactionItem.id}>
                <img
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
                  alt=""
                />
                <div className="transaction__text-box">
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    className="transaction__type"
                  >
                    {transactionItem.category.charAt(0).toUpperCase() +
                      transactionItem.category.slice(1)}
                  </Typography>
                  <Typography className="transaction__date">
                    {`${moment(transactionItem.date).format("D MMM")}`}
                  </Typography>
                </div>

                <p className="transaction__value">
                  {transactionItem.type === "income"
                    ? `+${appState.currency}${transactionItem.value}`
                    : `-${appState.currency}${transactionItem.value}`}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
