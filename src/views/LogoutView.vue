<template>
    <div class="logout-message">
      <h1>Sesión cerrada con éxito</h1>
      <p>Has cerrado sesión exitosamente. Gracias por usar nuestra aplicación.</p>
      <router-link to="/login" class="login-link">Iniciar sesión de nuevo</router-link>
    </div>
  </template>

<script>
</script>
  
<style scoped>
.logout-message {
  text-align: center;
  margin-top: 50px;
}

.login-link {
  display: inline-block;
  margin-top: 20px;
  background-color: #9c88ff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.login-link:hover {
  background-color: #7D6ECC;
}
</style>