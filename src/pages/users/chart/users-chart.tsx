import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface IUsersChart {
  dataChart: {
    labels: string[]
    datasets: number[]
  }
}

export const UsersChart: React.FC<IUsersChart> = ({ dataChart }): JSX.Element => {
  const { labels = [], datasets = [] } = dataChart || {}
  const data = {
    labels,
    datasets: [
      {
        label: 'кол-во пользователей',
        data: datasets,
        fill: true,
        backgroundColor: 'rgba(51, 93, 168, 0.3)',
        borderColor: 'rgba(51, 93, 168, 1)',
      },
    ],
  }

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return <Line data={data} options={options} />
}
