import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import HomePage from "@/views/HomePage.vue"; // Asegúrate de importar tu nuevo componente de página principal aquí

const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true } }, // Usa HomePage como componente para la ruta raíz
  { path: "/login", component: LoginView },
  { path: "/logout", component: LogoutView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ward para proteger rutas :v
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user"); // Verifica si el usuario está almacenado en localStorage
  if (to.meta.requiresAuth && !user) {
    next("/login"); // Si no hay usuario, redirige a la página de login
  } else {
    next(); // Si el usuario está autenticado o la ruta no requiere autenticación, continúa con la navegación
  }
});

export default router;
