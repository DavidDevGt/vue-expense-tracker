<template>
    <nav class="navbar">
      <div class="navbar-brand">Money Tracker</div>
      <button class="hamburger-btn" @click="toggleMenu">☰</button>
      <div v-if="isMenuOpen" class="navbar-menu">
        <Logout />
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Logout from './Logout.vue';
  
  const isMenuOpen = ref(false);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  </script>
  
  <style scoped>
.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4c51bf;
  color: white;
  padding: 10px 20px;
}

.navbar-brand {
  font-size: 1.5em;
}

.hamburger-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  z-index: 2; /* Asegúrate de que el botón esté sobre el menú desplegable */
}

.navbar-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  position: absolute;
  top: 50px; /* Ajusta según la altura de tu navbar */
  right: 10px; /* Ajusta según el diseño de tu navbar */
  left: 0;
  padding: 10px;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  color: black;
  width: 100%; /* O ajusta al ancho que prefieras */
  z-index: 1; /* Establece el z-index para el menú desplegable */
}

.logoutBtn {
  margin-top: 10px;
  width: 100%; /* Hacer que el botón ocupe todo el ancho del menú desplegable */
}

  </style>
  