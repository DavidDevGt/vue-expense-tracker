<template>
  <div class="logout-message">
    <h1>Sesión cerrada con éxito</h1>
    <p>¡Gracias por usar nuestra aplicación!</p>
    <router-link to="/login" class="login-link">Iniciar sesión de nuevo</router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from "@/services/AuthService";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

onMounted(async () => {
  try {
    await AuthService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success("Sesión cerrada con éxito.");
  } catch (error) {
    toast.error("Error al cerrar sesión.");
  }
});
</script>
  
<style scoped>
.logout-message {
  text-align: center;
  margin-top: 50px;
}

.login-link {
  display: inline-block;
  margin-top: 7px;
  background-color: #9c88ff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.login-link:hover {
  background-color: #7D6ECC;
  transition: background-color 0.3s ease;
}
</style>