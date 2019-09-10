import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  // mode: 'history',
  // base: process.env.PUBLIC_PATH,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/login')
    },
    {
      path: '/admin',
      component: () => import('@/views/backend/back_dashboard'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'backproducts',
          name: 'backProducts',
          component: () => import('@/views/backend/backend_pages/back_products')
        },
        {
          path: 'backorders',
          name: 'backOrders',
          component: () => import('@/views/backend/backend_pages/back_orders')
        },
        {
          path: 'backcoupons',
          name: 'backCoupons',
          component: () => import('@/views/backend/backend_pages/back_coupons')
        },
        {
          path: 'back_customer_orders',
          name: 'backCustomer',
          component: () => import('@/views/backend/backend_pages/back_customer_orders')
        },
        {
          path: 'back_slidebar',
          name: 'backSlidebar',
          component: () => import('@/views/backend/back_slidebar')
        }
      ]
    },
    /* 前端 */
    {
      path: '/',
      component: () => import('@/views/customer/customer_container'),
      children: [
        {
          path: '/',
          name: 'customerIndex',
          component: () => import('@/views/customer/customerpages/customer_index')
        },
        {
          path: 'checkout/:orderId',
          name: 'customerCheckout',
          component: () => import('@/views/customer/customerpages/customer_checkout')
        },
        {
          path: 'products',
          name: 'customerProducts',
          component: () => import('@/views/customer/customerpages/customer_products')
        },
        {
          path: 'cart',
          name: 'customerCart',
          component: () => import('@/views/customer/customerpages/customer_cart')
        },
        {
          path: 'order_form',
          name: 'customerOrderForm',
          component: () => import('@/views/customer/customerpages/customer_order_form')
        },
        {
          path: 'order_page',
          name: 'customerOrderPage',
          component: () => import('@/views/customer/customerpages/customer_order_page')
        },
        {
          path: 'contact',
          name: 'customerContact',
          component: () => import('@/views/customer/customerpages/customer_contact')
        },
        {
          path: 'product_page/:id',
          name: 'customerProductPage',
          component: () => import('@/views/customer/customerpages/customer_product_page')
        },
        {
          path: 'contact_update',
          name: 'customerContactUpdate',
          component: () => import('@/views/customer/customerpages/customer_contact_update')
        }
      ]
    }
  ]
})
