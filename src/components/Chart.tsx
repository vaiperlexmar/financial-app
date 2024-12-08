import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

function renderLineChart() {
  return (
    <ResponsiveContainer height={100} width="95%">
      <LineChart data={data}>
        <Line dataKey="uv" stroke="#8884d8" type="monotone" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default renderLineChart;
