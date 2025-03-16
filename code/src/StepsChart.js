import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", steps: 7500 },
  { name: "Tue", steps: 8200 },
  { name: "Wed", steps: 9100 },
  { name: "Thu", steps: 8700 },
  { name: "Fri", steps: 9400 },
  { name: "Sat", steps: 10200 },
  { name: "Sun", steps: 9800 },
];

{/*change this for bar graph */}

const StepChart = () => {
  return React.createElement(
    ResponsiveContainer,
    { width: "100%", height: 300 },
    React.createElement(
      BarChart,
      { data, margin: { top: 20, right: 30, left: 0, bottom: 5 } },
      React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
      React.createElement(XAxis, { dataKey: "name" }),
      React.createElement(YAxis, null),
      React.createElement(Tooltip, null),
      React.createElement(Legend, null),
      React.createElement(Bar, { dataKey: "steps", fill: "#1f1a1a" })
    )
  );
};

export default StepChart;