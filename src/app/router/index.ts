import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
		return { top: 0 }
	},
  routes: [
    { 
      path: '/', 
      redirect: '/orders' 
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import("../../pages/orders/OrdersPage.vue"),
      meta: {
        title: "orders"
      }
    },
    {
      path: '/orders/add',
      name: 'orders-add',
      component: () => import("../../pages/orders-add/OrdersAddPage.vue"),
      meta: {
        title: "orders-add"
      }
    },
    {
      path: '/orders/task',
      name: 'orders-task',
      component: () => import("../../pages/orders-task/OrdersTaskPage.vue"),
      meta: {
        title: "orders-task"
      }
    },
    {
      path: '/orders/report',
      name: 'orders-report',
      component: () => import("../../pages/orders-report/OrdersReportPage.vue"),
      meta: {
        title: "orders-report"
      }
    },
    // {
    //   path: '/receipt',
    //   name: 'receipt',
    //   component: () => import("../pages/receipt/ReceiptPage.vue"),
    //   meta: {
    //     title: "receipt"
    //   }
    // },

    {
      path: '/login',
      name: 'login',
      component: () => import("../../pages/auth/LoginPage.vue"),
      meta: {
        title: "login"
      }
    },
  ]
})

export default router
