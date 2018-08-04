<template>
  <div class="file-drop"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop">
    <slot/>
    <div class="hint" v-if="dragging">
      <slot name="hint"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FileDrop extends Vue {
  public dragging = false;

  public onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  public onDragEnter(e: DragEvent) {
    this.dragging = true;
  }

  public onDragLeave(e: DragEvent) {
    this.dragging = false;
  }

  public onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragging = false;
    this.$emit('drop', e.dataTransfer.files);
  }
}
</script>

<style scoped>
.file-drop {
  position: relative;
  height: 100%;
  width: 100%;
}

.hint {
  pointer-events: none;
}
</style>
