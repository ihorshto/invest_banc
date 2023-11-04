<template>
 <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
 name: 'BarChart',
 components: { Bar },
 data() {
  return {
   chartData: {
    labels: [
     'Blue',
     'Yellow'],
    datasets: [{
     label: 'My First Dataset',
     data: [43, 60],
     backgroundColor: [
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
     ],
     hoverOffset: 4
    }]
   }
  }
 }
}
</script>