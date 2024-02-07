const API_URL = "http://localhost/backend-expense-tracker/transactions";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};

export default {
  async getTransactions() {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener las transacciones");
    }
    return response.json();
  },

  async createTransaction(text, amount) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ text, amount }),
    });
    if (!response.ok) {
      throw new Error("Error al crear la transacción");
    }
    return response.json();
  },

  async getTransaction(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la transacción");
    }
    return response.json();
  },

  async updateTransaction(id, text, amount) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ text, amount }),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la transacción");
    }
    return response.json();
  },

  async deleteTransaction(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la transacción");
    }
    return response.json();
  },
};
