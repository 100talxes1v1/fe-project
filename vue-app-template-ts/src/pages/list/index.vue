<template>
  <div
    class="container"
  >
    <h2>{{ message }}</h2>
    <router-link :to="{ name: 'detail' }">
      to detail
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'List',
  data() {
    return {
      message: 'List page!'
    };
  }
});
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
