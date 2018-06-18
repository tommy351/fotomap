<template>
  <div ref="root"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSMSource from 'ol/source/osm';

// require('ol/ol.css');
import 'ol/ol.css';

@Component
export default class OpenLayersMap extends Vue {
  private map?: Map;

  public mounted() {
    this.map = new Map({
      target: this.$refs.root as Element,
      view: new View({
        center: [0, 0],
        zoom: 1
      }),
      layers: [
        new TileLayer({
          source: new OSMSource()
        })
      ]
    });
  }

  public unmounted() {
    if (this.map) {
      this.map.setTarget(null as any);
      this.map = undefined;
    }
  }
}
</script>
