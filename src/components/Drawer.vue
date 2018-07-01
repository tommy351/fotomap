<template>
  <aside class="drawer">
    <nav class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="onTabClicked(tab.id)"
        :class="['tab-btn', {active: currentTab === tab.id}]"
        :title="tab.text">
        <img :src="tab.icon" :alt="tab.text"/>
      </button>
    </nav>
    <div class="content">
      <LocationTab v-if="currentTab === 'location'"/>
      <MediaTab v-if="currentTab === 'media'"/>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LocationTab from './LocationTab.vue';
import MediaTab from './MediaTab.vue';

@Component({
  components: {
    LocationTab,
    MediaTab
  }
})
export default class Drawer extends Vue {
  public currentTab = 'location';

  public get tabs() {
    return [
      {
        id: 'location',
        icon: require('../assets/location.svg'),
        text: 'Location'
      },
      {
        id: 'media',
        icon: require('../assets/photo_library.svg'),
        text: 'Media'
      }
    ];
  }

  public onTabClicked(id: any) {
    this.currentTab = id;
  }
}
</script>

<style scoped>
.drawer {
  display: flex;
  height: 100%;
}

.tabs {
  --tab-size: 45px;

  flex-shrink: 0;
  height: 100%;
  width: var(--tab-size);
  background: #eee;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}

.tab-btn {
  border: none;
  background: none;
  cursor: pointer;
  height: var(--tab-size);
  width: var(--tab-size);
  padding: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 5px;
  }

  &.active::before {
    background: var(--accent-color);
  }
}

.content {
  height: 100%;
}
</style>
