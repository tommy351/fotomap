<template>
  <div class="container">
    <div class="map">
      <OpenLayersMap/>
    </div>
    <div class="drawer">
      <Drawer/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OpenLayersMap from './OpenLayersMap.vue';
import Drawer from './Drawer.vue';

@Component({
  components: {
    OpenLayersMap,
    Drawer
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
}

.map {
  flex-grow: 1;
  flex-shrink: 0;
  height: 100%;
}

.drawer {
  height: 100%;
}
</style>
