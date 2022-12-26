<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in features"
      :title="item.title"
      :name="item.id"
      :key="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps({
  features: {
    type: Array,
    required: true
  }
})

const activeName = ref(0)
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}

.el-collapse-item {
  :deep(a) {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
