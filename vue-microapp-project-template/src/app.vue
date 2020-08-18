<template>
  <div class="clues-app-wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
.clues-app-wrap{
  height: 100%;
  overflow-y: auto;
}
</style>
