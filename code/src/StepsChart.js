/**
 * StepChart.js
 *
 * A responsive bar chart that displays the user's step count per day of the week.
 * It pulls data from `localStorage` (key: "weeklySteps") and refreshes it every second.
 *
 * - Each bar represents steps taken on one weekday.
 * - Uses Recharts for charting.
 * - Updates dynamically using `setInterval` within a `useEffect` hook.
 */

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StepChart = () => {
  // Initialize data with all days set to 0 steps
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [data, setData] = useState(
    dayNames.map(day => ({ name: day, steps: 0 }))
  );

  // Fetch stored weekly step data from localStorage
  const refreshData = () => {
    const storedWeekly = localStorage.getItem('weeklySteps');
     // If no data exists, default to 0 steps for each day
    const weeklySteps = storedWeekly 
      ? JSON.parse(storedWeekly)
      : { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    const currentDayIndex = new Date().getDay();
    const currentDay = dayNames[currentDayIndex];

    // Create new data where only the current day gets its stored value.
    const updatedData = dayNames.map(day => ({
      name: day,
      steps: weeklySteps[day] || 0
    }));
    
    

    setData(updatedData);
  };

  // Refresh the chart every second to ensure it is actively updated.
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="steps" fill="#1f1a1a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StepChart;