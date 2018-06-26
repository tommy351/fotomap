<template>
  <ul>
    <li v-for="(p, index) in points" :key="index">
      <strong>{{ p.name }}</strong>
      <span>{{ p.type }}</span>
      <span>{{ p.Category }}</span>
      <span>{{ p.Distance }}</span>
      <span>{{ p.coord }}</span>
      <span>{{ p.address }}</span>
      <span>{{ p.description }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Feature from 'ol/feature';
import Coordinate from 'ol/coordinate';
import { getMapSources } from '../store/map';

@Component
export default class SourceList extends Vue {
  public get points() {
    const sources = getMapSources(this.$store);
    const features = sources
      .map(src => src.getFeatures())
      .reduce((acc, feats) => acc.concat(feats), [] as Feature[]);

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
}
</script>
