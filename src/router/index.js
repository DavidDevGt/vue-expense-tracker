import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import LoginView from '@/views/LoginView.vue';
import LogoutView from '@/views/LogoutView.vue';

const routes = [
  { path: '/', component: App, meta: { requiresAuth: true } }, // Ruta raíz protegida
  { path: '/login', component: LoginView },
  { path: '/logout', component: LogoutView, meta: { requiresAuth: true } }, // Ruta de logout protegida
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;