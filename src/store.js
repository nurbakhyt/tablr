import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '',
    schedules: [],
    loading: false,
  },
  getters: {
    showSchedule: state => state.schedules.length > 0,
  },
  mutations: {
    SET_NAME_MUTATION(state, name) {
      state.name = name;
    },
    SET_SCHEDULES_MUTATION(state, arr) {
      state.schedules = arr;
    },
    START_LOADING_MUTATION(state) {
      state.loading = true;
    },
    STOP_LOADING_MUTATION(state) {
      state.loading = false;
    },
  },
  actions: {
    setPlaceName({ commit }, name) {
      commit('SET_NAME_MUTATION', name);
    },
    fetchPlace({ commit, state }) {
      commit('START_LOADING_MUTATION');

      const url = process.env.VUE_APP_API_URL;

      axios.get(`${url}${state.name}`)
        .then(({ status, data }) => {
          if (status === 200) {
            commit('SET_SCHEDULES_MUTATION', data.data.place.schedules);
          }
        })
        .catch((res) => {
          if (res.status === 404) {
            console.log(res);
          }
        })
        .finally(() => {
          commit('STOP_LOADING_MUTATION');
        });
    },
  },
});
