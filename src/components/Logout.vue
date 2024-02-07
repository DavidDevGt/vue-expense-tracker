<template>
  <button class="logoutBtn" @click="redirectToLogoutPage">Cerrar sesión</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const redirectToLogoutPage = () => {
  router.push('/logout'); // Redirige al usuario a la ruta de LogoutView
};
</script>

<style scoped>
.logoutBtn {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
