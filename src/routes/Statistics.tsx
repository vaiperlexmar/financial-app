import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Typography, Button } from "@mui/material";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList.tsx";
import { Transaction } from "../types.ts";
import dayjs from "dayjs";

export default function Statistics() {
  const { appState } = useAppContext();
  const [period, setPeriod] = useState<string>("all");
  const [periodArray, setPeriodArray] = useState<Transaction[]>([]);

  // TO-DO может быть перенести это в функцию при добавлении новой записи
  const allSortedTransactions = appState.transactionsHistory.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  function filterTransactionsByDate(period: string) {
    switch (period) {
      case "day":
        setPeriod("day");
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), "d") === 0;
          })
        );
        break;
      case "week":
        setPeriod("week");
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), "week") === 0;
          })
        );
        break;
      case "month":
        setPeriod("month");
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), "month") === 0;
          })
        );
        break;
      case "year":
        setPeriod("year");
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), "year") === 0;
          })
        );
        break;
      default:
    }
  }

  return (
    <main className="statistics__container">
      <div className="statistics__period-selection">
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => {
            filterTransactionsByDate("day");
          }}
        >
          Day
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => {
            filterTransactionsByDate("week");
          }}
        >
          Week
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => {
            filterTransactionsByDate("month");
          }}
        >
          Month
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => {
            filterTransactionsByDate("year");
          }}
        >
          Year
        </Button>
      </div>
      <section className="statistics__entries">
        <div className="statistics__amount-container statistics__amount-container_black">
          <Typography component="p" variant="h4">
            {appState.currency}
            {appState.expenseAmount}
          </Typography>
          <Typography variant={"subtitle1"}>Expenses</Typography>
        </div>
        <div className="statistics__amount-container statistics__amount-container_white">
          <Typography component="p" variant="h4">
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
          transactions={period === "all" ? allSortedTransactions : periodArray}
        />
      </section>
    </main>
  );
}
