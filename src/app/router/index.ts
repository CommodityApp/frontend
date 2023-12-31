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
      name: 'orders-container',
      children: [
        {
          path: '/orders',
          name: 'orders',
          component: () => import("../../pages/orders/OrdersPage.vue"),
          meta: {
            title: "orders"
          },
        },
        {
          path: '/orders/add',
          name: 'orders-add',
          component: () => import("../../pages/orders-add/OrdersAddPage.vue"),
          meta: {
            title: "orders-add",
            id: null
    
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

      ]
    },
    
    
    {
      path: '/receipts',
      name: 'receipts-container',
      children:[
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

      ]
    },

    {
      path: '/raws',
      name:'raws-container',
      children:[
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
          path: '/raws/add',
          name: 'raws-add',
          component: () => import("../../pages/raws-add/RawsAddPage.vue"),
          meta: {
            title: "raws-add"
          },
        },
      ]
    },

    {
      path: '/prices',
      name:'prices-container',
      children: [
        {
          path: '/prices',
          name: 'prices',
          component: () => import("../../pages/prices/PricesPage.vue"),
          meta: {
            title: "prices"
          },
        },
        {
          path: '/prices/add',
          name: 'prices-add',
          component: () => import("../../pages/prices/PricesAddPage.vue"),
          meta: {
            title: "prices-add"
          },
        }
      ]
    },
    {
      path: '/rations',
      name:'rations-container',
      children: [
        {
          path: '/rations',
          name: 'rations',
          component: () => import("../../pages/rations/RationsPage.vue"),
          meta: {
            title: "rations"
          },
        },
        {
          path: '/rations/add',
          name: 'rations-add',
          component: () => import("../../pages/rations/RationsAddPage.vue"),
          meta: {
            title: "rations-add"
          },
        }
      ]
    },
    {
      path: '/animals',
      name:'animals-container',
      children: [
        {
          path: '/animals',
          name: 'animals',
          component: () => import("../../pages/animals/AnimalsPage.vue"),
          meta: {
            title: "animals"
          }
        },
        {
          path: '/animals-add',
          name: 'animals-add',
          component: () => import("../../pages/animals/AnimalsAddPage.vue"),
          meta: {
            title: "animals-add"
          }
        },
      ]
    },
    {
      path: '/users',
      name:'users-container',
      children: [
        {
          path: '/users',
          name: 'users',
          component: () => import("../../pages/users/UsersPage.vue"),
          meta: {
            title: "users"
          }
        },
        {
          path: '/users-add',
          name: 'users-add',
          component: () => import("../../pages/users/UsersAddPage.vue"),
          meta: {
            title: "users-add"
          }
        },
      ]
    },
    {
      path: '/clients',
      name:'clients-container',
      children: [
        {
          path: '/clients',
          name: 'clients',
          component: () => import("../../pages/clients/ClientsPage.vue"),
          meta: {
            title: "clients",
          }
        },
        {
          path: '/clients-add',
          name: 'clients-add',
          component: () => import("../../pages/clients/ClientsAddPage.vue"),
          meta: {
            title: "clients-add",
          }
        },
      ]
    },
    {
      path: '/producers',
      name:'producers-container',
      children: [
        {
          path: '/producers',
          name: 'producers',
          component: () => import("../../pages/producers/ProducersPage.vue"),
          meta: {
            title: "producers",
          }
        },
        {
          path: '/producers-add',
          name: 'producers-add',
          component: () => import("../../pages/producers/ProducersAddPage.vue"),
          meta: {
            title: "producers-add",
          }
        },
      ]
    },
    {
      path: '/raw-types',
      name:'raw-types-container',
      children: [
        {
          path: '/raw-types',
          name: 'raw-types',
          component: () => import("../../pages/raw-types/RawTypesPage.vue"),
          meta: {
            title: "raw-types",
          }
        },
        {
          path: '/raw-types-add',
          name: 'raw-types-add',
          component: () => import("../../pages/raw-types/RawTypesAddPage.vue"),
          meta: {
            title: "raw-types-add",
          }
        },
      ]
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import("../../pages/activities/ActivitiesPage.vue"),
      meta: {
        title: "activities",
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
