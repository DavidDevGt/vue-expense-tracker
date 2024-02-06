import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  mutations: {
    setAuth(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
      state.token = payload.token;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('setAuth', {
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
      });
    },
    logout({ commit }) {
      commit('clearAuth');
    },
  },
});

export default store;