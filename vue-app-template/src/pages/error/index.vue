<template>
  <div>
    <div class="error">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    let error = this.$route.params;
    this.message = error.err.message;
    // let vm = error.vm;
    // let url = vm.$route.fullPath;
  }
};
</script>

<style>
.error {
  font-size: 10vw;
}
</style>
