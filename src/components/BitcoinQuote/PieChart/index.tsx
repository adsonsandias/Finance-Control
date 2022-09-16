/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Cell, Pie, PieChart } from "recharts";

import { dataWallet } from "../../../services/ApiCard";

const COLORS = [
  "url(#colorGreen)",
  "url(#colorOrange)",
  "url(#colorBlue)",
  "url(#colorPurple)",
];

export function PieChartItem() {
  return (
    <PieChart width={278} height={278}>
      <defs>
        <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="16.95%" stopColor="#8F94FB" stopOpacity={1} />
          <stop offset="89.96%" stopColor="#4E54C8" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="-8.18%" stopColor="#56CCF2" stopOpacity={1} />
          <stop offset="112.11%" stopColor="#2F80ED" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="-8.18%" stopColor="#FFE664" stopOpacity={1} />
          <stop offset="112.11%" stopColor="#FA8341" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="-8.18%" stopColor="#7FDFBD" stopOpacity={1} />
          <stop offset="112.11%" stopColor="#12A454" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Pie
        data={dataWallet}
        innerRadius={70}
        outerRadius={140}
        fill="#8884d8"
        paddingAngle={4}
        dataKey="value"
      >
        {dataWallet.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
