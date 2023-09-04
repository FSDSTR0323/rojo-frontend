import { Typography } from '@mui/material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export const PieChart = ({ title, pieChartData, sx }) => {
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0
          const dataArr = ctx.chart.data.datasets[0].data
          dataArr.map((data) => {
            sum += data
          })
          const percentage = ((value * 100) / sum).toFixed(2) + '%'
          return percentage
        },
        color: '#fff',
        font: { size: '20em' }
      }
    }
  }

  const backgroundColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 99, 132, 0.8)'
  ]
  const borderColors = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)']

  const data = {
    labels: pieChartData.labels,
    datasets: [
      {
        data: pieChartData.data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }
    ]
  }

  return (
    <>
      <Typography variant="h3" sx={sx}>
        {title}
      </Typography>
      <Pie options={options} data={data} />
    </>
  )
}
