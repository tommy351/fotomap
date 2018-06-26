import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import { KMLState } from './state';

type KMLContext = ActionContext<KMLState, RootState>;

export const kml = {
  namespaced: true,

  state: {
    files: []
  },

  getters: {
    getKMLFiles(state: KMLState) {
      return state.files;
    }
  },

  mutations: {
    loadKMLFiles(state: KMLState, files: File[]) {
      state.files = files;
    }
  }
};

const { commit, read, dispatch } = getStoreAccessors<KMLState, RootState>(
  'kml'
);

export const getKMLFiles = read(kml.getters.getKMLFiles);

export const loadKMLFiles = commit(kml.mutations.loadKMLFiles);
