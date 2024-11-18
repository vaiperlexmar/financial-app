import { useContext } from "react";
import { AppContext } from "../AppProvider";
import { Typography, Button } from "@mui/material";

export default function Statistics() {
  const { state: appState, dispatch: setAppState } = useContext(AppContext);
  console.log(appState.transactionsHistory);

  return (
    <main>
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
        <div className="entries__expenses-amount"></div>
        <div className="entries__income-amount">{appState.incomeAmount}</div>
      </section>
      <section className="statistics__graph"></section>
      <section className="statistics__transactions">
        <header>
          <Typography variant="h2" component="h2">
            Transactions
          </Typography>
          <Typography>See all</Typography>
        </header>
        <ul className="statistics__transactions-list">
          {appState.transactionsHistory.toReversed().map((transactionItem) => {
            return (
              <li className="statistics__transaction" key={transactionItem.id}>
                <img src="" alt="" />
                <div className="transaction__text-box">
                  <Typography className="transaction__type">
                    {transactionItem.category}
                  </Typography>
                  <Typography className="transaction__date">
                    {`${transactionItem.date}`}
                  </Typography>
                </div>

                <p className="transaction__value">
                  {transactionItem.type === "income"
                    ? `+${transactionItem.value}`
                    : `-${transactionItem.value}`}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
