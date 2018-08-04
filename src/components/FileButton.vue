<template>
  <div class="file-button">
    <input
      type="file"
      class="input"
      ref="input"
      :accept="accept"
      :multiple="multiple"
      @change="onChange"/>
    <div @click="onClick">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FileButton extends Vue {
  @Prop(String)
  public accept?: string;
  @Prop(Boolean)
  public multiple?: boolean;

  public onChange(e: Event) {
    this.$emit('change', (e.target as any).files);
  }

  public onClick() {
    (this.$refs.input as any).click();
  }
}
</script>

<style scoped>
.file-button {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.input {
  position: absolute;
  top: -99999px;
  left: -99999px;
}
</style>
