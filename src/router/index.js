import { createRouter, createWebHistory } from 'vue-router'

import Home      from '../views/Home.vue'
import About     from '../views/About.vue'
import Features  from '../views/Features.vue'
import Team      from '../views/Team.vue'
import Contact   from '../views/Contact.vue'
import Download  from '../views/Download.vue'
import AIBot     from '../views/AIBot.vue'
import Dashboard from '../views/Dashboard.vue'
import Auth      from '../views/Auth.vue'
import NotFound  from '../views/NotFound.vue'

const routes = [
  { path: '/',          component: Home,      meta: { title: 'ANCS - Automated Network Configuration System' } },
  { path: '/ai-bot',     component: AIBot,     meta: { title: 'AI Bot - ANCS' } },
  { path: '/about',     component: About,     meta: { title: 'About - ANCS' } },
  { path: '/features',  component: Features,  meta: { title: 'Features - ANCS' } },
  { path: '/team',      component: Team,      meta: { title: 'Team - ANCS' } },
  { path: '/contact',   component: Contact,   meta: { title: 'Contact - ANCS' } },
  { path: '/download',  component: Download,  meta: { title: 'Download - ANCS' } },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard - ANCS', requiresAuth: true, adminOnly: true, hideLayout: true }
  },
  {
    path: '/login',
    component: Auth,
    meta: { title: 'Login - ANCS', hideLayout: true, guestOnly: true }
  },
  // 404 — يجب أن يكون آخر route دائماً
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: '404 - Page Not Found' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll to top on every route change
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'ANCS'

  const token = localStorage.getItem('token')
  const role  = localStorage.getItem('dash-role')

  // Protect dashboard — يحتاج token + role = admin
  if (to.meta.requiresAuth) {
    if (!token) return next('/login')
    if (to.meta.adminOnly && role !== 'admin') return next('/')
  }

  // لو user logged in وحاول يدخل /login — وجهه حسب الـ role
  if (to.meta.guestOnly && token) {
    return next(role === 'admin' ? '/dashboard' : '/')
  }

  next()
})

export default router
