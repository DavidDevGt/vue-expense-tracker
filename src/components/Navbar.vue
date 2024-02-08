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
  z-index: 2;
}

.navbar-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  position: absolute;
  top: 50px;
  right: 10px;
  left: 0;
  padding: 10px;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  color: black;
  width: 100%;
  z-index: 1;
}

.logoutBtn {
  margin-top: 10px;
  width: 100%;
}

  </style>
  