<template>
  <div class="tab">
    <form @submit="onSubmit">
      <input type="file" multiple ref="fileInput"/>
      <button type="submit">Load</button>
    </form>
    <div v-for="(file, index) in files" :key="index">
      <header>
        <strong>{{ file.name }}</strong>
        <button @click="onRemoveFile(index)">x</button>
      </header>
      <ul>
        <li v-for="(feat, index) in file.features" :key="index">
          <strong>{{ feat.name }}</strong>
          <span>{{ feat.type }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Feature from 'ol/feature';
import Coordinate from 'ol/coordinate';
import VectorSource from 'ol/source/vector';
import {
  getMapSources,
  addMapSourcesFromKMLFiles,
  removeMapSource
} from '../store/map';

function getPoints(source: VectorSource) {
  const features = source.getFeatures();

  return features.map(feat => {
    const geometry = feat.getGeometry();
    const props = feat.getProperties();

    return {
      ...props,
      type: geometry.getType(),
      coord: Coordinate.toStringHDMS((geometry as any).getCoordinates())
    };
  });
}

@Component
export default class LocationTab extends Vue {
  public get sources() {
    return getMapSources(this.$store);
  }

  public get files() {
    return this.sources.map(src => ({
      name: src.get('filename'),
      features: getPoints(src)
    }));
  }

  public onSubmit(e: any) {
    e.preventDefault();

    const files: File[] = Array.from((this.$refs.fileInput as any)
      .files as any);
    addMapSourcesFromKMLFiles(this.$store, files);
  }

  public onRemoveFile(index: any) {
    removeMapSource(this.$store, index);
  }
}
</script>

<style scoped>
.tab {
  height: 100%;
  overflow: auto;
}
</style>

