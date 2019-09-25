import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '',
    schedules: [],
    loading: false,
    daysOfWeek: [
      'Пн',
      'Вт',
      'Ср',
      'Чт',
      'Пт',
      'Сб',
      'Вс',
    ],
    today: new Date(),
    error: '',
  },
  getters: {
    showSchedule: state => state.schedules.length > 0,
    numberOfDay: state => state.today.getDay(),
    currentTime: state => `${state.today.getHours()}:${state.today.getMinutes()}`,
    scheduleOfToday: state => state,
    formattedSchedules: (state, getters) => state.schedules.map((schedule) => {
      const daysByTimeMap = {};
      let status = 'закрыто';

      schedule.items.forEach((item) => {
        if (daysByTimeMap[item.timeInterval]) {
          daysByTimeMap[item.timeInterval] = [
            ...daysByTimeMap[item.timeInterval],
            item.day,
          ];
        } else {
          daysByTimeMap[item.timeInterval] = [item.day];
        }
      });
      const scheduleOfToday = schedule.items[getters.numberOfDay];
      if (scheduleOfToday) {
        if (
          getters.currentTime >= scheduleOfToday.startAt
          && getters.currentTime <= scheduleOfToday.endAt
        ) {
          status = 'открыто';
        }
      }

      const daysByTime = Object.keys(daysByTimeMap).map((key) => {
        const days = daysByTimeMap[key];

        switch (days.length) {
          case 0:
            break;
          case 1:
            return {
              days: days[0],
              time: key,
            };
          case 2:
            return {
              days: `${days[0]}, ${days[1]}`,
              time: key,
            };
          default:
            return {
              days: `${days[0]} - ${days[1]}`,
              time: key,
            };
        }
      });

      return {
        ...schedule,
        daysByTime,
        status,
      };
    }),
    hasError: state => state.error.length > 0,
    errorMessage: state => state.error,
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
    SET_ERROR_MUTATION(state, msg) {
      state.error = msg;
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
        .then((response) => {
          if (response.status === 200) {
            const schedules = response.data.data.place.schedules.map(schedule => ({
              ...schedule,
              items: state.daysOfWeek.map((day, i) => {
                const scheduleDay = schedule.items.find(item => item.dayOfWeek === i + 1);
                if (scheduleDay) {
                  let timeInterval = `${scheduleDay.startAt} - ${scheduleDay.endAt}`;

                  if (scheduleDay.startAt === '00:00' && scheduleDay.endAt === '23:59') {
                    timeInterval = 'Круглосуточно';
                  }

                  return {
                    ...scheduleDay,
                    day,
                    timeInterval,
                  };
                }

                return {
                  day,
                  timeInterval: 'Выходной',
                };
              }),
            }));

            commit('SET_ERROR_MUTATION', '');
            commit('SET_SCHEDULES_MUTATION', schedules);
          } else {
            commit('SET_ERROR_MUTATION', 'Что-то не так');
          }
        })
        .catch((err) => {
          commit('SET_ERROR_MUTATION', err.response.data.message);
        })
        .finally(() => {
          commit('STOP_LOADING_MUTATION');
        });
    },
  },
});
