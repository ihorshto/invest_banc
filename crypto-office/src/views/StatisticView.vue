<script setup>
import { ref } from 'vue'
import { useCalculationStore } from '../stores/calculs';



const storeInvestments = useCalculationStore();

console.log(storeInvestments.totalInvestment);

let line = 'min-height: ' + `${storeInvestments.totalInvestment}` + 'px; background-color: red;';

console.log("line", line);
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
        <span :style="line">2</span>
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

