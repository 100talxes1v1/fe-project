<template>
  <div class="<%=appName%>-app-wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import './assets/css/global.scss';
</style>
