import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Typography, Button } from "@mui/material";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList.tsx";
import { BasicTransaction, StatisticsPeriod } from "../types.ts";
import dayjs from "dayjs";

export default function Statistics() {
  const { appState } = useAppContext();
  const [period, setPeriod] = useState<string>(StatisticsPeriod.ALL);
  const [periodArray, setPeriodArray] = useState<BasicTransaction[]>([]);

  // TO-DO может быть перенести это в функцию при добавлении новой записи
  const allSortedTransactions = appState.transactionsHistory.sort(
    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
  );

  function filterTransactionsByDate(period: string) {
    switch (period) {
      case StatisticsPeriod.DAY:
        setPeriod(StatisticsPeriod.DAY);
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), StatisticsPeriod.DAY) === 0;
          })
        );
        break;
      case StatisticsPeriod.WEEK:
        setPeriod(StatisticsPeriod.WEEK);
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), StatisticsPeriod.WEEK) === 0;
          })
        );
        break;
      case StatisticsPeriod.MONTH:
        setPeriod(StatisticsPeriod.MONTH);
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), StatisticsPeriod.MONTH) === 0;
          })
        );
        break;
      case StatisticsPeriod.YEAR:
        setPeriod(StatisticsPeriod.YEAR);
        setPeriodArray(
          appState.transactionsHistory.filter((item) => {
            return dayjs(item.date).diff(dayjs(), StatisticsPeriod.YEAR) === 0;
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
            filterTransactionsByDate(StatisticsPeriod.DAY);
          }}
        >
          Day
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => {
            filterTransactionsByDate(StatisticsPeriod.WEEK);
          }}
        >
          Week
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => {
            filterTransactionsByDate(StatisticsPeriod.MONTH);
          }}
        >
          Month
        </Button>
        <Button
          className="statistics__period"
          variant="text"
          onClick={() => {
            filterTransactionsByDate(StatisticsPeriod.YEAR);
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
        <Chart
          periodTransactionsArray={
            period === StatisticsPeriod.ALL
              ? allSortedTransactions
              : periodArray
          }
        />
      </section>
      <section className="statistics__transactions">
        <header className="statistics__transactions-header">
          <Typography variant="h5">Transactions</Typography>
          <Typography>See all</Typography>
        </header>
        <TransactionList
          transactions={
            period === StatisticsPeriod.ALL
              ? allSortedTransactions
              : periodArray
          }
        />
      </section>
    </main>
  );
}
