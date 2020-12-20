<template>
<div class="<%=appName%>-app-title">
  {{title}}
</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.<%=appName%>-app-title{
  width: 100%;
  height: 48px;
  line-height: 48px;
  color: #262626;
  font-size: 16px;
  background: #E8E8E8;
  margin-top: -14px;
}
</style>
