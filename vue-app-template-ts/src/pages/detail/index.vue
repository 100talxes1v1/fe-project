<template>
  <div
    class="container"
  >
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      message: 'Detail page!'
    };
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
