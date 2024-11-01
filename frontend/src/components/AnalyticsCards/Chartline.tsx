
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Basicbars = () => {
  const data = {
    labels: ['Total visitors', 'Project views', 'Clicks on projects', 'Demo requests'],
    datasets: [
      {
        data: [850, 600, 450, 175],
        backgroundColor: '#93c5fd',
        borderRadius: 4,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { y }; }) {
            return `Value: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
        },
      },
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 200,
          font: {
            size: 12,
          },
          color: '#666',
        },
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="w-full     p-6">
      <div className="mb-6">
        <h2 className=" font-bold text-[#344054] font-[500] text-[16px] leading-[24px]  mb-2">
          Conversion Process from Visitors to Demo Requests
        </h2>
        <p className="text-[12px] font-[400] leading-[18px] text-[#667085]">
          Shows the number of visitors and engagement over time (daily, weekly, monthly).
        </p>
      </div>
      <div className="h-80 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Basicbars;