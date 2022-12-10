<template>
  <div>
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull, { Screenfull } from 'screenfull'

// 类型断言，解决 ts 报错
const screenfullType = screenfull as Screenfull

const isFullscreen = ref(false)
const onToggle = () => {
  screenfullType.toggle()
}

const change = () => {
  isFullscreen.value = screenfullType.isFullscreen
}
onMounted(() => {
  screenfullType.on('change', change)
})
onUnmounted(() => {
  screenfullType.off('change', change)
})
</script>

<style lang="scss" scoped></style>
