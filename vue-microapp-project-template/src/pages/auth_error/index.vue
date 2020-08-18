<template>
  <div class="not-found">
    <img
      src="@/assets/img/auth_error.png"
      alt="errorImage"
      title="errorImage"
    >
    <p>抱歉，该页面没有权限访问</p>
  </div>
</template>

<script>
export default {
  name: 'NoAuth'
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
