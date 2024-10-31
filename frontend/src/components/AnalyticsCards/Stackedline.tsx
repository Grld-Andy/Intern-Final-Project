
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
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendChart = () => {
  const labels = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Dec'];
  
  const data = {
    labels,
    datasets: [
      {
        label: '',  
        data: [500, 550, 580, 600, 650, 670, 700],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: '', 
        data: [300, 350, 380, 360, 400, 410, 450],
        borderColor: '#f59e0b',
        backgroundColor: '#f59e0b',
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: '',  
        data: [100, 150, 200, 180, 250, 300, 400],
        borderColor: '#6b7280',
        backgroundColor: '#6b7280',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `Value: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#f3f4f6',
          drawTicks: false,
        },
        border: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          },
          color: '#6b7280',
          padding: 8
        }
      },
      y: {
        min: 0,
        max: 1000,
        border: {
          display: false
        },
        ticks: {
          stepSize: 200,
          font: {
            size: 12
          },
          color: '#6b7280',
          padding: 8
        },
        grid: {
          display: true,
          color: '#e5e7eb',
          drawTicks: false,
          lineWidth: 1
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className="w-full  lg:p-6">
      
      <div className="h-80 w-full bg-white">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default TrendChart;