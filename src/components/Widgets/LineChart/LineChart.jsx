import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ title, seriesData, sx }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
      },
    },
  };
  const seriesBorderColors = ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'];
  const seriesBackgroundColors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(53, 162, 235, 0.5)',
  ];

  const data = {
    labels: seriesData[0].data.xAxis,
    datasets: seriesData.map((serie, index) => ({
      label: serie.seriesName,
      data: serie.data.yAxis,
      borderColor: seriesBorderColors[index],
      backgroundColor: seriesBackgroundColors[index],
    })),
  };

  return (
    <>
      <Typography variant="h3" sx={sx}>
        {title}
      </Typography>
      <Line options={options} data={data} />
    </>
  );
};
