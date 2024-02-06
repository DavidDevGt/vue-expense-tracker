import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  },
  mutations: {
    authenticateUser(state, { user, token }) {
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    authenticateUser({ commit }, payload) {
      commit("authenticateUser", payload);
    },
    logoutUser({ commit }) {
      commit("logoutUser");
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});
