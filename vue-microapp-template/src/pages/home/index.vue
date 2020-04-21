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

<script>
export default {
  name: 'Home',
  data() {
    return {
      message: 'Hello world!'
    };
  }
};
</script>

<style>
.container {
  text-align: center;
}
</style>
