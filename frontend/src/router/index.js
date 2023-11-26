import { createRouter, createWebHistory } from 'vue-router';
import VueCookies from 'vue-cookies';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import VerifyView from '@/views/VerifyView.vue';
import WhatIsView from '@/views/WhatIsView.vue';
import FAQView from '@/views/FAQView.vue';
import AboutView from '@/views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { roles: [] },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { roles: [] },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { roles: [] },
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyView,
      props: (route) => ({ email: route.query.email, token: route.query.token }),
      meta: { roles: [] },
    },
    {
      path: '/what-is-vehiclevibes',
      name: 'what-is-vehiclevibes',
      component: WhatIsView,
      meta: { roles: [] },
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQView,
      meta: { roles: [] },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { roles: [] },
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: () => import('@/views/SwipeView.vue'),
      meta: { roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'] },
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import('@/views/MatchesView.vue'),
      meta: { roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'] },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'] },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = VueCookies.get('user');
  const requiredRoles = to.meta.roles;

  if (requiredRoles.length === 0 || (user && requiredRoles.some((role) => user.roles.includes(role)))) {
    next();
  } else {
    next('/login');
  }
});

export default router;
