import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const PieChart = ({ pieChartData }) => {
  // Check if pieChartData is valid
  if (
    !pieChartData ||
    !Array.isArray(pieChartData.labels) ||
    !Array.isArray(pieChartData.data)
  ) {
    return <div>Invalid data for the pie chart.</div>;
  }

  const data = {
    labels: pieChartData.labels,
    datasets: [
      {
        data: pieChartData.data,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          console.log(value, ctx)
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
      },
    },
  };

  return <Pie options={options} data={data} />;
};
