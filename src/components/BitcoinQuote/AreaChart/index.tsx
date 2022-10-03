/* eslint-disable import/no-extraneous-dependencies */

import { AreaChart, Area } from "recharts";

import IconBitcon from "../../../assets/bitcoin.svg";
import { dataBitcoin } from "../../../services/ApiCard";
import { AreaChartStyles } from "./styles";

interface IAREACHARTITEM {
  value: number | string;
  symbol: string;
}

export function AreaChartItem({ ...props }: IAREACHARTITEM) {
  const { value, symbol } = props;
  return (
    <AreaChartStyles>
      <div>
        <div>
          <img src={IconBitcon} alt="Icone do Bitcoin " />
          <div>
            <span>Bitcon</span>
            <span>{symbol}</span>
          </div>
        </div>
        <AreaChart width={127} height={63} data={dataBitcoin}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFE664" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FA8341" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#FCB552"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
        <strong>{value}</strong>
      </div>
    </AreaChartStyles>
  );
}
