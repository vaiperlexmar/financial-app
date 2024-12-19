import {
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { GraphProps, StatisticsPeriod } from "../types";
import dayjs from "dayjs";

class GraphEntity {
  name: string;
  _income?: number;
  _expense?: number;

  constructor(name: string, income?: number, expense?: number) {
    this.name = name;
    this._income = income;
    this._expense = expense;
  }

  get income() {
    return this._income;
  }

  get expense() {
    return this._expense;
  }

  set income(value: number) {
    console.log(isNaN(value));
    this._income = value;
  }

  set expense(value: number) {
    this._expense = value;
  }
}

function RenderBarChart({ periodTransactionsArray }: GraphProps) {
  const periodTransactionAmounts: GraphEntity[] = [];

  for (let transaction of periodTransactionsArray) {
    // элемент в течение недели, значит дни недели не повторяются
    if (dayjs(transaction.date).diff(dayjs(), StatisticsPeriod.DAY) < 8) {
      // если пустой массив или элемент уже есть и он не подходит
      if (
        periodTransactionAmounts.length === 0 ||
        periodTransactionAmounts[periodTransactionAmounts.length - 1][
          "name"
        ] !== dayjs(transaction.date).format("ddd")
      ) {
        const currentGraphEntity = new GraphEntity(
          dayjs(transaction.date).format("ddd")
        );
        switch (transaction.type) {
          case "expense":
            !currentGraphEntity.expense
              ? (currentGraphEntity.expense = transaction.value)
              : (currentGraphEntity.expense += transaction.value);
            break;
          case "income":
            !currentGraphEntity.income
              ? (currentGraphEntity.income = transaction.value)
              : (currentGraphEntity.income += transaction.value);
            break;
        }

        periodTransactionAmounts.push(currentGraphEntity);
      } else {
        const currentElement =
          periodTransactionAmounts[periodTransactionAmounts.length - 1];
        switch (transaction.type) {
          case "expense":
            !currentElement.expense
              ? (currentElement.expense = transaction.value)
              : (currentElement.expense += transaction.value);
            break;
          case "income":
            //
            !currentElement.income
              ? (currentElement.income = transaction.value)
              : (currentElement.income += transaction.value);
            break;
        }
      }
    }
  }

  console.log(periodTransactionAmounts);

  return (
    <ResponsiveContainer height={100} width="95%">
      <BarChart data={periodTransactionAmounts.toReversed()}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />

        <Bar barSize={10} dataKey="expense" fill="#8884d8" />
        <Bar barSize={10} dataKey="income" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RenderBarChart;
