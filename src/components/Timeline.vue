<template>
  <div class="timeline">
     <div v-for="(file, index) in files" :key="index">
      <header>
        <strong>{{ file.name }}</strong>
        <button @click="onRemoveFile(index)">x</button>
      </header>
      <ul>
        <li v-for="(feat, index) in file.features" :key="index">
          <strong>{{ feat.name }}</strong>
          <span>{{ feat.type }}</span>
          <span>{{ feat.time.start.toLocaleString() }} ~ {{ feat.time.end.toLocaleString() }}</span>
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
import { getMapSources, removeMapSource } from '../store/map';

const REGEX_DATETIME = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)/;
const REGEX_DATETIME_STR = REGEX_DATETIME.toString().slice(1, -1);
const REGEX_TIME_RANGE = new RegExp(
  `from (${REGEX_DATETIME_STR}) to (${REGEX_DATETIME_STR})`
);

function parseTimeRange(input: string) {
  const match = input.match(REGEX_TIME_RANGE);
  if (!match) {
    return;
  }

  return {
    start: new Date(match[1]),
    end: new Date(match[2])
  };
}

function getPoints(source: VectorSource) {
  const features = source.getFeatures();

  return features
    .map(feat => {
      const geometry = feat.getGeometry();
      const props = feat.getProperties();

      return {
        ...props,
        time: parseTimeRange(props.description),
        type: geometry.getType(),
        coord: Coordinate.toStringHDMS((geometry as any).getCoordinates())
      };
    })
    .sort((a, b) => a.time!.start.valueOf() - b.time!.start.valueOf());
}

@Component
export default class Timeline extends Vue {
  public get sources() {
    return getMapSources(this.$store);
  }

  public get files() {
    return this.sources.map(src => ({
      name: src.get('filename'),
      features: getPoints(src)
    }));
  }

  public onRemoveFile(index: any) {
    removeMapSource(this.$store, index);
  }
}
</script>
