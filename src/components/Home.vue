<template>
  <div class="home">
    <div class="home-drawer">
      <Drawer/>
    </div>
    <div class="home-map">
      <OpenLayersMap/>
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
.home {
  --accent-color: orange;
  height: 100%;
  display: flex;
  position: relative;
}

.home-drawer {
  height: 100%;
  width: 300px;
  flex-shrink: 0;
}

.home-map {
  height: 100%;
  width: 100%;
}
</style>
