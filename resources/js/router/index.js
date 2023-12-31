import useAuthenticationStore from '@stores/authentication'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
        middleware: 'auth',
        title: 'Dashboard',
      },
    },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      meta: {
        middleware: 'auth',
      },
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: {
            title: 'Dashboard',
          },
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
          meta: {
            title: 'Account Settings',
          },
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
          meta: {
            title: 'Typography',
          },
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
          meta: {
            title: 'Icons',
          },
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
          meta: {
            title: 'Cards',
          },
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
          meta: {
            title: 'Tables',
          },
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
          meta: {
            title: 'Form',
          },
        },
        {
          path: 'editor',
          component: () => import('../pages/ckeditor.vue'),
          meta: {
            title: 'Editor',
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      meta: {
        middleware: 'guest',
      },
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../pages/login.vue'),
          meta: {
            title: 'Login Page',
          },
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
          meta: {
            title: 'Register Page',
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
          meta: {
            title: 'Page not found!',
          },
        },
      ],
    },
  ],
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthenticationStore()

  console.log(authStore.authenticated)
  console.log(to.meta)
  document.title = to.meta.title
  if (to.meta.middleware == 'guest') {
    if (authStore.authenticated) {
      next({ name: 'dashboard' })
      
      return
    }
    next()
  } else {
    if (!authStore.authenticated) {
      next({ name: 'login' })
  
      return
    }
    next()
  }
})

export default router
