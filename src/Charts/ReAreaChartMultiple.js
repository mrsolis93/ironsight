import React from 'react';
import { AreaChart,
     Area,
      XAxis,
       YAxis,
        Tooltip,
        } from 'recharts';

import LinearProgress from "@mui/material/LinearProgress";
import { useQuery } from "react-query";
import { getDocCount } from "../IronsightAPI";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ReAreaChart() {


 

    return (
      
        <AreaChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8142FF" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#8142FF" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#359EE5" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#359EE5" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F9C852" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#F9C852" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <XAxis dataKey="chart_data_keys" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#8142FF" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#359EE5" fillOpacity={1} fill="url(#colorPv)" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#F9C852" fillOpacity={1} fill="url(#colorAmt)" />
        </AreaChart>
      
    );
  }
