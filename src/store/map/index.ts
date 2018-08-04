import { MapState } from './state';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import TileLayer from 'ol/layer/tile';
import OSMSource from 'ol/source/osm';
import VectorLayer from 'ol/layer/vector';
import KMLFormat from 'ol/format/kml';
import VectorSource from 'ol/source/vector';

const kmlFormat = new KMLFormat();

export const map = {
  namespaced: true,

  state: {
    base: new TileLayer({
      source: new OSMSource()
    }),
    sources: [],
    center: [0, 0],
    zoom: 2,
    rotation: 0
  },

  getters: {
    getMapLayers(state: MapState) {
      return [
        state.base,
        ...state.sources.map(source => new VectorLayer({ source }))
      ];
    },

    getMapSources(state: MapState) {
      return state.sources;
    },

    getMapCenter(state: MapState) {
      return state.center;
    },

    getMapZoom(state: MapState) {
      return state.zoom;
    },

    getMapRotation(state: MapState) {
      return state.rotation;
    }
  },

  mutations: {
    addMapSourcesFromKMLFiles(state: MapState, files: File[]) {
      const sources = files.map(file => {
        const source = new VectorSource({
          url: URL.createObjectURL(file),
          format: kmlFormat
        });

        source.set('filename', file.name);

        return source;
      });

      state.sources = [...state.sources, ...sources];
    },

    setMapCenter(state: MapState, center: [number, number]) {
      state.center = center;
    },

    setMapZoom(state: MapState, zoom: number) {
      state.zoom = zoom;
    },

    setMapRotation(state: MapState, rotation: number) {
      state.rotation = rotation;
    },

    removeMapSource(state: MapState, index: any) {
      const removed = state.sources.splice(index, 1);

      for (const src of removed) {
        URL.revokeObjectURL(src.getUrl() as string);
      }
    }
  }
};

const { commit, read, dispatch } = getStoreAccessors<MapState, RootState>(
  'map'
);

export const getMapLayers = read(map.getters.getMapLayers);
export const getMapSources = read(map.getters.getMapSources);
export const getMapCenter = read(map.getters.getMapCenter);
export const getMapZoom = read(map.getters.getMapZoom);
export const getMapRotation = read(map.getters.getMapRotation);

export const addMapSourcesFromKMLFiles = commit(
  map.mutations.addMapSourcesFromKMLFiles
);
export const setMapCenter = commit(map.mutations.setMapCenter);
export const setMapZoom = commit(map.mutations.setMapZoom);
export const setMapRotation = commit(map.mutations.setMapRotation);
export const removeMapSource = commit(map.mutations.removeMapSource);
