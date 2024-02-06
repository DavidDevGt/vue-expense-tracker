<template>
    <div class="login-container">
        <input v-model="username" type="text" placeholder="Usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <button class="btn" @click="login">Iniciar sesión</button>
    </div>
</template>
  
<script setup>
import AuthService from "@/services/AuthService";
import { useToast } from "vue-toastification";
import { ref } from "vue";

const toast = useToast();
const username = ref("");
const password = ref("");

const login = async () => {
    try {
        const data = await AuthService.login(username.value, password.value);
        if (data) {
            localStorage.setItem('user', JSON.stringify(data)); // Almacena la respuesta del login

            toast.success(data.message);

            router.push('/'); // Redirige al usuario a la ruta raíz o a cualquier otra ruta deseada
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
</style>
  