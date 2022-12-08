<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const locale = computed(() => {
  return store.getters.language === 'en' ? en : zhCn
})

// 每次刷新，去拿用户选中的主题色去生成项目主题
generateNewStyle(store.getters.mainColor).then((cssText) => {
  writeNewStyle(cssText)
})
</script>

<style></style>
