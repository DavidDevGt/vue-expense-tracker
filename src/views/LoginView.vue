<template>
    <div class="login-container">
        <h2 class="login-title">Iniciar Sesión</h2>
        <div class="inputs-container">
            <input v-model="username" class="login-input" type="text" placeholder="Usuario" />
            <input v-model="password" class="login-input" type="password" placeholder="Contraseña" />
        </div>
        <button class="btn login-btn" @click="login">Iniciar sesión</button>
    </div>
</template>

<script setup>
import AuthService from "@/services/AuthService";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import { useRouter } from 'vue-router'; // Importa useRouter

const toast = useToast();
const username = ref("");
const password = ref("");
const router = useRouter(); // Define router aquí

const login = async () => {
    try {
        const data = await AuthService.login(username.value, password.value);
        if (data) {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            toast.success(data.message);
            router.push('/'); // Ahora router está definido y puedes redirigir
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
    gap: 1.5rem;
    padding: 2.5rem;
    border-radius: 10px;
    max-width: 400px;
    margin: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to right, #D7DBE4, #B9ABD3);
}

.login-title {
    margin-bottom: 1rem;
    color: #000000;
    font-weight: 600;
    font-size: 1.9rem;
}

.inputs-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.login-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
}

.login-input:focus {
    outline: none;
    border-color: #9c88ff;
}

.login-btn {
    width: 100%;
    padding: 0.75rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-btn:hover {
    background-color: #7D6ECC;
}

</style>
