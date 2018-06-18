import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface State {
  files?: File[];
}

export default new Vuex.Store<State>({
  state: {
    files: undefined
  },
  mutations: {
    changeFiles: (state, payload) => {
      state.files = payload;
    }
  },
  actions: {}
});
