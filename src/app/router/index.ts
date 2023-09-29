import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from "../stores/AuthStore"

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
      path: '/orders/task/:id',
      name: 'orders-report',
      component: () => import("../../pages/orders-report/OrdersReportPage.vue"),
      meta: {
        title: "orders-report"
      }
    },
    {
      path: '/receipts',
      name: 'receipts',
      component: () => import("../../pages/receipts/ReceiptsPage.vue"),
      meta: {
        title: "receipts"
      }
    },
    {
      path: '/receipts/add',
      name: 'receipts-add',
      component: () => import("../../pages/receipts-add/ReceiptsAddPage.vue"),
      meta: {
        title: "receipt"
      },
    },
    {
      path: '/raws',
      name: 'raws',
      component: () => import("../../pages/raws/RawsPage.vue"),
      meta: {
        title: "raws",
        id: null
      }
    },
    {
      path: '/animals',
      name: 'animals',
      component: () => import("../../pages/animals/AnimalsPage.vue"),
      meta: {
        title: "animals"
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import("../../pages/users/UsersPage.vue"),
      meta: {
        title: "users"
      }
    },


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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if(!authStore.accessToken && to.path !== "/login"){
    next('/login')
  }
  next()
})

export default router
