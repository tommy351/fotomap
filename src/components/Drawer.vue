<template>
  <aside class="drawer">
    <FileDrop @drop="onFileChanged">
      <main class="drawer-main">
        <FileButton multiple @change="onFileChanged">
          <button class="file-btn">Load files</button>
        </FileButton>
        <Timeline/>
      </main>
      <div class="drop-hint" slot="hint">
        <span class="drop-hint-text">
          Drop files here
        </span>
      </div>
    </FileDrop>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FileButton from './FileButton.vue';
import FileDrop from './FileDrop.vue';
import Timeline from './Timeline.vue';
import { addMapSourcesFromKMLFiles } from '../store/map';

@Component({
  components: {
    FileButton,
    FileDrop,
    Timeline
  }
})
export default class Drawer extends Vue {
  public onFileChanged(fileList: FileList) {
    const files = Array.from(fileList);
    const images = files.filter(f => f.type.startsWith('image/'));
    const kmls = files.filter(f => f.name.endsWith('.kml'));

    addMapSourcesFromKMLFiles(this.$store, kmls);
  }
}
</script>

<style scoped>
.drawer {
  height: 100%;
}

.drawer-main {
  height: 100%;
  overflow: auto;
}

.file-btn {
  background: var(--accent-color);
  width: 100%;
  border: none;
  padding: 10px;
  text-align: center;
}

.drop-hint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.drop-hint-text {
  font-size: 30px;
  text-align: center;
  width: 100%;
}
</style>
