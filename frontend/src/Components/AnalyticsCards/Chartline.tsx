import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BasicBars = () => {
  // Data and configuration for the chart
  const data = {
    labels: ['Group A', 'Group B', 'Group C'],
    datasets: [
      {
        label: 'Number of Axes',
        data: [900, 600, 400],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Ensure 'top' is treated as a constant
      },
      title: {
        display: true,
        text: 'Conversion Stages',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Conversion Stages', // X-axis label
        },
        ticks: {
          padding: 20, // Adjusts the spacing of the ticks
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Axes', // Y-axis label
        },
        beginAtZero: true,
        ticks: {
          stepSize: 100, // Controls spacing of ticks on Y-axis
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BasicBars;
