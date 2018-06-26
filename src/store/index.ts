import Vue from 'vue';
import Vuex from 'vuex';
import { State } from './state';
import { map } from './map';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  modules: {
    map
  }
});
