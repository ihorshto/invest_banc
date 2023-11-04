<script setup >
import { ref } from 'vue'
import { useCalculationStore } from '../stores/calculs';
import BarChart from '../views/BarChart.vue'
import DonutChart from '../views/DonutChart.vue'


const storeInvestments = useCalculationStore();
console.log(storeInvestments.totalInvestment);

// let line = 'min-height: ' + `${storeInvestments.totalInvestment}` + 'px; background-color: red;';

</script>

<template>
  <main>
    <div class="container statistic">
      <div class="content_box">
        <h2 class="content-title"> Statistic </h2>
        <p class="content-text" id="investSum">Sum of investments: {{ storeInvestments.totalInvestment }}$</p>
        <p class="content-text" id="investSum">Sum of earnings: {{ storeInvestments.totalEarnings }}$</p>
        <br>
      </div>
      <div>
        <DonutChart :dataInvest="storeInvestments.totalInvestment" text="hello world" />
      </div>
    </div>
  </main>
</template>

<style>
.statistic {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

