<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'App'
})
export default class App extends Vue {
}
</script>

<style scoped>

</style>
