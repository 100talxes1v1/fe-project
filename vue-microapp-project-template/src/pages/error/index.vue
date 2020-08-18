<template>
  <div class="error-wrap">
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
    const error = this.$route.params;
    this.message = error.err;
    // let vm = error.vm;
    // let url = vm.$route.fullPath;
  }
};
</script>

<style scoped lang="scss">
.error-wrap{
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .error {
    font-size: 10vw;
  }
}

</style>
