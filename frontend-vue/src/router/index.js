import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  linkActiveClass: 'active text-primary border-bottom border-primary',
  linkExactActiveClass: 'active text-primary border-bottom border-primary border-3',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bills',
      name: 'bills',
      component: () => import('../views/BillsView.vue')
    },

    {
      path: '/edit-bill',
      redirect: '/create-bill'
    },
    // ici on déclare une route dynamique avec un paramètre :id
    {
      path: '/edit-bill/:id',
      props: true, //sert à récupérer les paramètres sous la forme de props dans le composant de la vue
      name: 'edit-bill',
      component: () => import('../views/CreateEditBillView.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/ClientsView.vue')
    },
    {
      path: '/edit-client/:id',
      props: true, //sert à récupérer les paramètres sous la forme de props dans le composant de la vue
      name: 'edit-client',
      component: () => import('../views/CreateEditClientView.vue')
    },
  ]
})

export default router
