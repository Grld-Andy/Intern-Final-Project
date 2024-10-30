import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Stackedline() {
  const data = {
    labels: [
      'Jan',  'Mar',  'May',  'Jul',  'Sep',  'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'User Engagement 1',
        data: [500, 505, 500, 520, 530, 500, 500, 502, 490, 500, 560, 570],
        backgroundColor: 'rgba(0, 123, 255, 0.2)', 
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
        
      },
      {
        label: 'User Engagement 2',
        data: [380, 370, 375, 379, 380, 389, 376.5, 380.5, 375.5, 374.5, 370.5, 400],
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        borderColor: 'rgba(255, 193, 7, 1)',
        borderWidth: 1,
      
      },
      {
        label: 'User Engagement 3',
        data: [230, 230.5, 250.1, 270, 230, 281, 250, 180, 200, 240, 280, 300],
        backgroundColor: 'rgba(108, 117, 125, 0.2)', // gray fill
        borderColor: 'rgba(108, 117, 125, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
        grid: {
            
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'User Engagement',
        },
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 200,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
}
