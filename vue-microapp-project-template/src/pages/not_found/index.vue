<template>
  <div class="not-found">
    <img
      src="@/assets/img/pic_404.png"
      alt="errorImage"
      title="errorImage"
    >
    <p>很遗憾，没有找到</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style lang='scss' scoped>
.not-found {
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
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
