<template>
  <div
    class="container"
  >
    <h2>{{ message }}</h2>
    <router-link :to="{ name: 'list' }">
      to list
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Home',
  data() {
    return {
      message: 'Hello world!'
    };
  }
})
export default class Home extends Vue {
}
</script>

<style>
.container {
  text-align: center;
}
</style>
