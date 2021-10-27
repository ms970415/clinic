import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/user.vue'
import Password from '../components/user/password.vue'
import Stock from '../components/items/stock.vue'
import Drugs from '../components/items/drugs.vue'
import Report from '../components/items/report.vue'
import Diagnosis from '../components/items/diagnosis.vue'
import Journal from '../components/items/journal.vue'
import Information from '../components/items/information.vue'
import Income from '../components/items/income.vue'

Vue.use(VueRouter)
const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {path: '/home', component: Home, redirect: '/diagnosis', children: [
    {path: '/user', component: User},
    {path: '/password', component: Password},
    {path: '/stock', component: Stock},
    {path: '/drugs', component: Drugs},
    {path: '/report', component: Report},
    {path: '/diagnosis', component: Diagnosis},
    {path: '/journal', component: Journal},
    {path: '/information', component: Information},
    {path: '/income', component: Income},
  ]},

]

const router = new VueRouter({
  routes
})

export default router
