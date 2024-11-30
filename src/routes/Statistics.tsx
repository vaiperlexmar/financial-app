import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Typography, Button } from "@mui/material";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList.tsx";
import { Transaction } from "../types.ts";

export default function Statistics() {
  const { appState } = useAppContext();
  const [period, setPeriod] = useState<string>("all");
  const [periodArray, setPeriodArray] = useState<Transaction[]>([]);

  // TO-DO может быть перенести это в функцию при добавлении новой записи
  const allSortedTransactions = appState.transactionsHistory.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // function filterTransactionsByDate(
  //
  //   transactions: Transaction[],
  // ) {
  //
  // }

  return (
    <main className="statistics__container">
      <div className="statistics__period-selection">
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => setPeriod("day")}
        >
          Day
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => setPeriod("day")}
        >
          Week
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => setPeriod("month")}
        >
          Month
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => setPeriod("year")}
        >
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
        <TransactionList
          transactions={
            period === "all" ? allSortedTransactions : allSortedTransactions
          }
        />
      </section>
    </main>
  );
}
