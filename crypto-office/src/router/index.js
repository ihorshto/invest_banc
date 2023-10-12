import { createRouter, createWebHistory } from 'vue-router'
import InvestmentView from '../views/InvestmentView.vue'
import EarningsView from '../views/EarningsView.vue'
import InvestmentItemView from '../views/InvestmentItemView.vue'

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
      path: '/investments/:id',
      name: 'investmentItem',
      component: InvestmentItemView
    }
  ]
})

export default router
