/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  {
    name: "jul 1",
    deposito: 4000,
    fatura: 2400,
    amt: 2400,
  },
  {
    name: "jul 9",
    deposito: 3000,
    fatura: 1398,
    amt: 2210,
  },
  {
    name: "jul 18",
    deposito: 2000,
    fatura: 9800,
    amt: 2290,
  },
  {
    name: "jul 27",
    deposito: 2780,
    fatura: 3908,
    amt: 2000,
  },
  {
    name: "jul 31",
    deposito: 1890,
    fatura: 4800,
    amt: 2181,
  },
  {
    name: "ago 1",
    deposito: 2390,
    fatura: 3800,
    amt: 2500,
  },
  {
    name: "ago 9",
    deposito: 3490,
    fatura: 4300,
    amt: 2100,
  },
];

export function MonthTransaction() {
  return (
    <BarChart width={334} height={232} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis fontSize={12} dataKey="name" />
      <YAxis fontSize={12} />
      <Tooltip />
      <Bar dataKey="fatura" fill="#8884d8" />
      <Bar dataKey="deposito" fill="#82ca9d" />
    </BarChart>
  );
}
