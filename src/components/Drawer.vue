<template>
  <aside class="drawer">
    <KMLLoader/>
    <SourceList/>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import KMLLoader from './KMLLoader.vue';
import SourceList from './SourceList.vue';

@Component({
  components: {
    KMLLoader,
    SourceList
  }
})
export default class Drawer extends Vue {}
</script>

<style scoped>
.drawer {
  height: 100%;
  overflow: auto;
}
</style>
