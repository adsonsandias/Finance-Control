/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { dataTransaction } from "../../../services/ApiCard";

export function MonthTransaction() {
  return (
    <BarChart width={334} height={232} data={dataTransaction}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis fontSize={12} dataKey="name" />
      <YAxis fontSize={12} />
      <Tooltip />
      <Bar dataKey="fatura" fill="#8884d8" />
      <Bar dataKey="deposito" fill="#82ca9d" />
    </BarChart>
  );
}
