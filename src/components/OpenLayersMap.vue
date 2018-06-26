<template>
  <div class="map" ref="root"/>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Map from 'ol/map';
import View from 'ol/view';
import BaseLayer from 'ol/layer/base';
import Collection from 'ol/collection';
import OLEvent from 'ol/events/event';
import Observable from 'ol/observable';
import {
  getMapLayers,
  getMapCenter,
  setMapCenter,
  setMapZoom,
  getMapZoom,
  getMapRotation,
  setMapRotation
} from '../store/map';

import 'ol/ol.css';

@Component
export default class OpenLayersMap extends Vue {
  private map?: Map;
  private moveEndListener?: any;

  public mounted() {
    const map = new Map({
      target: this.$refs.root as Element,
      view: new View({
        center: this.center,
        zoom: this.zoom,
        rotation: this.rotation
      }),
      layers: this.layers
    });

    this.map = map;
    this.moveEndListener = map.on('moveend', this.onMapMoveEnd);
  }

  public unmounted() {
    if (this.map) {
      Observable.unByKey(this.moveEndListener);
      this.map.setTarget(null as any);
      this.map = undefined;
    }
  }

  public get layers() {
    return getMapLayers(this.$store);
  }

  public get center() {
    return getMapCenter(this.$store);
  }

  public get zoom() {
    return getMapZoom(this.$store);
  }

  public get rotation() {
    return getMapRotation(this.$store);
  }

  @Watch('layers')
  public onLayersChanged(layers: BaseLayer[]) {
    if (!this.map) {
      return;
    }

    this.map.getLayerGroup().setLayers(new Collection(layers));
  }

  public onMapMoveEnd(event: OLEvent) {
    const view = event.target.getView();

    setMapCenter(this.$store, view.getCenter());
    setMapZoom(this.$store, view.getZoom());
    setMapRotation(this.$store, view.getRotation());
  }
}
</script>

<style scoped>
.map {
  width: 100%;
}
</style>
