import React from 'react'
import { LineChart , AreaChart, Area, Line , XAxis , YAxis , CartesianGrid , Tooltip , Legend } from 'recharts'

const data = [
  {
    "Fecha": '01/01/2022',
    "Presion": 300
  },
  {
    "Fecha": '02/01/2022',
    "Presion": 170
  },
  {
    "Fecha": '03/01/2022',
    "Presion": 185
  },
  {
    "Fecha": '04/01/2022',
    "Presion": 200
  },
  {
    "Fecha": '05/01/2022',
    "Presion": 159
  },
  {
    "Fecha": '06/01/2022',
    "Presion": 180
  },
  {
    "Fecha": '07/01/2022',
    "Presion": 190
  }
];

const GraphCard = () =>{
    return (
      <AreaChart width={1000} height={500} data={data}
      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="Fecha" />
      <YAxis dataKey='Presion' />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
      <Area type="monotone" dataKey="Presion" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
    )
}

export default GraphCard;
