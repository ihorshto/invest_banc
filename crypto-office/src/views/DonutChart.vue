<script scooped>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { useCalculationStore } from '../stores/calculs';

const storeInvestments = useCalculationStore();

let sumGlobal = storeInvestments.totalInvestment + storeInvestments.totalEarnings;
let onePercent = sumGlobal / 100;
console.log("sumGlobal", sumGlobal);
console.log("onePercent", onePercent);

let investmentsPercent = Math.round(storeInvestments.totalInvestment / onePercent);
let earningsPercent = Math.round(storeInvestments.totalEarnings / onePercent);


console.log("investmentsPercent", investmentsPercent);
console.log("earningsPercent", earningsPercent);
console.log("storeInvestments", storeInvestments.totalEarnings);

console.log("dataInvest", dataInvest);

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
 props: ['dataInvest', 'text'],
 name: 'DoughnutChart',
 components: { Doughnut },
 data() {
  return {
   chartData: {
    labels: ['Investments', 'Earnings'],
    datasets: [
     {
      backgroundColor: ['#41B883', '#E46651'],
      data: [investmentsPercent, earningsPercent]
      // data: [investmentsPercent, earningsPercent]
     }
    ]
   },
   chartOptions: {
    responsive: true
   }
  }
 }
}
</script>

<template>
 <div class="container mt-5">
  <h2 class="mb-4 text-center">{{ text }}</h2>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" class="donut" />
  <!-- {{ dataInvest.totalInvestment }}
  {{ dataInvest.totalInvestment }} -->


 </div>
</template>

<style>
.donut {
 width: 500px;
 height: 500px;
}
</style>