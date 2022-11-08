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

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'График регистрации пользователей',
    },
  },
}

const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

const labels = () => {
  const m: string[] = []
  const date: Date = new Date()

  for (let i = 0; i < date.getDate(); i++) m.push(`${i + 1} ${months[date.getMonth()]}`)

  return m
}

const data = {
  labels: labels(),
  datasets: [
    {
      label: 'кол-во пользователей',
      data: [33, 53, 85, 41, 44, 65, 38, 85, 73, 80],
      fill: true,
      backgroundColor: 'rgba(51, 93, 168, 0.2)',
      borderColor: 'rgba(51, 93, 168, 1)',
    },
  ],
}

export const UsersChart: React.FC = (): JSX.Element => {
  return <Line data={data} options={options} />
}
