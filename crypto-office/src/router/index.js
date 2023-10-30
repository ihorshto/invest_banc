import { createRouter, createWebHistory } from 'vue-router'
import InvestmentView from '../views/InvestmentView.vue'
import EarningsView from '../views/EarningsView.vue'
import InvestmentItemView from '../views/InvestmentItemView.vue'
import EarningItemView from '../views/EarningItemView.vue'
import StatisticView from '../views/StatisticView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/investments',
      name: 'investments',
      component: InvestmentView
    },
    {
      path: '/earnings',
      name: 'earnings',
      component: EarningsView
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: StatisticView
    },
    {
      path: '/investments/:id',
      name: 'investmentItem',
      component: InvestmentItemView
    },
    {
      path: '/earnings/:id',
      name: 'earningItem',
      component: EarningItemView
    }
  ]
})

export default router
