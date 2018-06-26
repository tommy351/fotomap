import Vue from 'vue';
import Vuex from 'vuex';
import { State } from './state';
import { kml } from './kml';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  modules: {
    kml
  }
});
