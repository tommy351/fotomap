<template>
  <div id="app">
    <OpenLayersMap/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import OpenLayersMap from './components/OpenLayersMap.vue';

import 'normalize.css';

@Component({
  components: {
    HelloWorld,
    OpenLayersMap
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
