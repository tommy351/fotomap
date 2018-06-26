<template>
  <div class="map" ref="root"/>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Map from 'ol/map';
import View from 'ol/view';
import BaseLayer from 'ol/layer/base';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import KMLFormat from 'ol/format/kml';
import OSMSource from 'ol/source/osm';
import VectorSource from 'ol/source/vector';
import Proj from 'ol/proj';
import { mapState } from 'vuex';
import Collection from 'ol/collection';
import { getKMLFiles } from '../store/kml';

import 'ol/ol.css';

@Component
export default class OpenLayersMap extends Vue {
  private map?: Map;

  public mounted() {
    const projection = Proj.get('EPSG:3857');

    const base = new TileLayer({
      source: new OSMSource()
    });

    const map = new Map({
      target: this.$refs.root as Element,
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection
      }),
      layers: [base]
    });

    this.map = map;

    // map.getView().on('change', event => {
    //   console.log('change', event.target.getCenter(), event.target.getZoom());
    // });
  }

  public unmounted() {
    if (this.map) {
      this.map.setTarget(null as any);
      this.map = undefined;
    }
  }

  public get files() {
    return getKMLFiles(this.$store);
  }

  @Watch('files')
  public onFileChanged(files?: File[]) {
    if (!this.map) {
      return;
    }

    const group = this.map.getLayerGroup();
    const base = group.getLayers().item(0);
    const layers = [base, ...this.buildLayersFromFiles(files)];

    group.setLayers(new Collection(layers));
  }

  private buildLayersFromFiles(files?: File[]): BaseLayer[] {
    if (!files) {
      return [];
    }

    const layers: BaseLayer[] = [];
    const format = new KMLFormat();

    for (const file of files) {
      const source = new VectorSource({
        url: URL.createObjectURL(file),
        format
      });

      layers.push(new VectorLayer({ source }));
    }

    return layers;
  }
}
</script>

<style scoped>
.map {
  width: 100%;
}
</style>
