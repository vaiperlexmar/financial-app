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
    <ResponsiveContainer width="95%" height={100}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default renderLineChart;
