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

<script>
export default {
  name: 'List',
  data() {
    return {
      message: 'List page!'
    };
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
