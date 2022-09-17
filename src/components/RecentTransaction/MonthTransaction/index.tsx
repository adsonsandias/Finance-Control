/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { dataTransaction } from "../../../services/ApiCard";

export function MonthTransaction() {
  return (
    <BarChart width={334} height={232} data={dataTransaction}>
      <CartesianGrid
        strokeDasharray="0"
        height={1}
        stroke="rgba(240, 242, 245, 1)"
      />
      <XAxis fontSize={12} dataKey="name" stroke="rgba(194, 199, 215, 1)" />
      <YAxis fontSize={12} unit="k" stroke="rgba(194, 199, 215, 1)" />
      <Tooltip />
      <Bar dataKey="fatura" fill="#9E6CF1" />
      <Bar dataKey="deposito" fill="#33CC95" />
    </BarChart>
  );
}
