const API_URL = "https://api-money.davidwebgt.click/users";

export default {
  async login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Error en el inicio de sesión");
    }

    const data = await response.json();
    return data;
  },

  async logout() {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Error al cerrar sesión");
    }

    return response.json();
  },
};
