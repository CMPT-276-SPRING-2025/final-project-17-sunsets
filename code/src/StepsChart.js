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

// StepChart component displays a bar chart of steps taken each day
// Initializes chart data with 0 steps for all days
const StepChart = () => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [data, setData] = useState(
    dayNames.map(day => ({ name: day, steps: 0 }))
  );

  // Function to fetch and update step data from localStorage
  const refreshData = () => {
    const storedWeekly = localStorage.getItem('weeklySteps');
    // If data found from localstorage found, parse it, otherwise default to all zeros
    const weeklySteps = storedWeekly 
      ? JSON.parse(storedWeekly)
      : { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    // Map day names to chart-friendly format
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