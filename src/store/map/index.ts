import BaseLayer from 'ol/layer/base';
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
    setMapSourcesFromKMLFiles(state: MapState, files: File[]) {
      state.sources = files.map(
        file =>
          new VectorSource({
            url: URL.createObjectURL(file),
            format: kmlFormat
          })
      );
    },

    setMapCenter(state: MapState, center: [number, number]) {
      state.center = center;
    },

    setMapZoom(state: MapState, zoom: number) {
      state.zoom = zoom;
    },

    setMapRotation(state: MapState, rotation: number) {
      state.rotation = rotation;
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

export const setMapSourcesFromKMLFile = commit(
  map.mutations.setMapSourcesFromKMLFiles
);
export const setMapCenter = commit(map.mutations.setMapCenter);
export const setMapZoom = commit(map.mutations.setMapZoom);
export const setMapRotation = commit(map.mutations.setMapRotation);
