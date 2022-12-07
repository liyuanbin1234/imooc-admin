<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const locale = computed(() => {
  return store.getters.language === 'en' ? en : zhCn
})
</script>

<style></style>
