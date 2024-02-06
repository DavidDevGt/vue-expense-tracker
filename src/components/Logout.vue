<template>
  <button class="logoutBtn" @click="logout">Cerrar sesión</button>
</template>

<script>
import AuthService from "@/services/AuthService";
import { useToast } from "vue-toastification";

const toast = useToast();

const logout = async () => {
  try {
    await AuthService.logout();
    // Manejar estado de autenticación
    toast.success("Sesión cerrada");
  } catch (error) {
    toast.error(error.message);
  }
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
