import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: '01/02',
    total: 4000,
  },
  {
    name: '02/02',
    total: 3000,
  },
  {
    name: '03/02',
    total: 2000,
  },
  {
    name: '04/02',
    total: 2780,
  },
  {
    name: '05/02',
    total: 1890,
  },
  {
    name: '06/02',
    total: 2390,
  },
  {
    name: '07/02',
    total: 3490,
  },
];
export default function ShareChart() {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          data={data}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: -20,
            bottom: 5,
          }}
          width={500}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="total" stroke="#04AFAF" type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
