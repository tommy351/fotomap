<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './components/Home.vue';

import 'normalize.css';

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  height: 100%;
}
</style>
