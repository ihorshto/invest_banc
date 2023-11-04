<script scooped>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
// import { useCalculationStore } from '../stores/calculs';

// const storeInvestments = useCalculationStore();

// let sumGlobal = storeInvestments.totalInvestment + storeInvestments.totalEarnings;
// let onePercent = sumGlobal / 100;
// console.log("sumGlobal", sumGlobal);
// console.log("onePercent", onePercent);

// let investmentsPercent = Math.round(storeInvestments.totalInvestment / onePercent);
// let earningsPercent = Math.round(storeInvestments.totalEarnings / onePercent);


// console.log("investmentsPercent", investmentsPercent);
// console.log("earningsPercent", earningsPercent);
// console.log("storeInvestments", storeInvestments.totalEarnings);

// console.log("dataInvest", dataInvest);

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
 props: ['dataInvest', 'text'],
 name: 'DoughnutChart',
 components: { Doughnut },
 data(props) {
  return {
   chartData: {
    labels: ['Investments', 'Earnings'],
    datasets: [
     {
      backgroundColor: ['#41B883', '#E46651'],
      // data: [investmentsPercent, earningsPercent]
      data: [props.dataInvest.totalInvestment, props.dataInvest.totalEarnings]
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
  <div class="chart">
   <h4 class="mb-4 text-center">{{ text }}</h4>
   <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" class="donut" />
   Investments - {{ Math.round(dataInvest.totalInvestment / ((dataInvest.totalInvestment + dataInvest.totalEarnings) /
    100)) }}% ||
   Earnings - {{ Math.round(dataInvest.totalEarnings / ((dataInvest.totalInvestment + dataInvest.totalEarnings) / 100))
   }}%
  </div>
 </div>
</template>

<style>
.chart {
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
}

.donut {
 width: 400px !important;
 height: 400px !important;
}
</style>