<script setup lang="ts">
import Word3D from './components/Word3D.vue'
</script>

<template>
  <div id="app">
    <main>
      <Word3D />
    </main>
  </div>
</template>

<style scoped>
#app,
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(45, 45, 64, 1) 0%, rgba(0, 0, 0, 1) 100%);
}
main {
  height: 100%;
}
</style>
