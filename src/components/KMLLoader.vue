<template>
  <form @submit="onSubmit">
    <div>
    <label>
      <span>Load KML file</span>
      <input type="file" multiple @change="onFileChanged"/>
    </label>
    </div>
    <button type="submit">Load</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { addMapSourcesFromKMLFiles } from '../store/map';

@Component
export default class KMLLoader extends Vue {
  private files?: FileList;

  public onSubmit(e: any) {
    e.preventDefault();
    addMapSourcesFromKMLFiles(this.$store, Array.from(this.files as any));
  }

  public onFileChanged(e: any) {
    this.files = e.target.files;
  }
}
</script>
