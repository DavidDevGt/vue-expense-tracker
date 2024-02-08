import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import HomePage from "@/views/HomePage.vue"; // Asegúrate de importar tu nuevo componente de página principal aquí

const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true } }, // Usa HomePage como componente para la ruta raíz
  { path: "/login", component: LoginView },
  { path: "/logout", component: LogoutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ward para proteger rutas :v
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp < Date.now() / 1000;

      if (isTokenExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        next("/login");
      } else {
        next();
      }
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
