<template>
  <div class="error-wrap">
    <img
      :src="errorImage"
      alt="errorImage"
      title="errorImage"
    >
    <p>{{ message }}</p>
  </div>
</template>

<script>
import errorImage from '@/assets/img/page_error.png';
import productLineErrorImage from '@/assets/img/product_line_wrong@2x.png';

export default {
  name: 'Error',
  data() {
    return {
      errorImage: errorImage,
      message: ''
    };
  },
  mounted() {
    const error = this.$route.params;
    if (!error.err) {
      return;
    }
    if (error.err.name === 'noSupportProductLine') {
      this.errorImage = productLineErrorImage;
      const srcUrl = this.$route.query.src_url;
      this.$watch('mpBizProductLine', (val) => {
        this.$router.replace(decodeURIComponent(srcUrl));
      });
      this.message = '';
    } else {
      this.message = error.err.message ? error.err.message : error.err.toString();
    }
    console.error(error.err); // eslint-disable-line
  }
};
</script>

<style scoped lang="scss">
.error-wrap {
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  top:0;
  right:0;
  bottom:0;
  left:0;
  margin:auto;
  img{
    width:679px;
    height:389px;
  };
  p{
    margin:0;
    padding:0;
  }
  font-size: 16px;
  color:#333;
}

</style>
