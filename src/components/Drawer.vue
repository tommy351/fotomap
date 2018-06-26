<template>
  <aside>
    <form @submit="onSubmit">
      <div>
      <label>
        <span>Load KML file</span>
        <input type="file" multiple @change="onFileChanged"/>
      </label>
      </div>
      <button type="submit">Load</button>
    </form>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { loadKMLFiles } from '../store/kml';

@Component
export default class Drawer extends Vue {
  private files?: FileList;

  public onSubmit(e: any) {
    e.preventDefault();
    loadKMLFiles(this.$store, Array.from(this.files as any));
  }

  public onFileChanged(e: any) {
    this.files = e.target.files;
  }
}
</script>
