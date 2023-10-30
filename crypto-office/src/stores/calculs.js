import { defineStore } from 'pinia'

export const useCalculationStore = defineStore("calculation", {
 state: () => ({
  totalInvestment: 0,
  totalEarnings: 0
 }),
 actions: {
  getAllInvestments(newValue) {
   this.totalInvestment = newValue;
  },
  getAllEarnings(newValue) {
   this.totalEarnings = newValue;
  }
 }
});


