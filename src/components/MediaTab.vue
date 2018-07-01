<template>
  <div class="tab">
    <form>
      <input type="file" multiple accept="image/*"/>
      <button type="submit">Load</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MediaTab extends Vue {}
</script>

<style scoped>
.tab {
  height: 100%;
  overflow: auto;
}
</style>
