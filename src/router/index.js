import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/details',
        name: 'Detail',
        component: () => import(/* webpackChunkName: "home" */ '../views/Detail.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router