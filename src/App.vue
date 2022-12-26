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
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'

const store = useStore()
const locale = computed(() => {
  return store.getters.language === 'en' ? en : zhCn
})

// 每次刷新，去拿用户选中的主题色去生成项目主题
generateNewStyle(store.getters.mainColor).then((cssText) => {
  writeNewStyle(cssText)
})

// tagsView
const route = useRoute()
const getTitle = (route: any): string => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

watch(
  route,
  (to) => {
    if (isTags(to.path)) {
      const { fullPath, meta, name, params, path, query } = to
      store.commit('app/addTagsViewList', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to)
      })
    }
  },
  { immediate: true }
)

// 监听语言变化
watchSwitchLang(
  // tagsView 语言变化
  () => {
    store.getters.tagsViewList.forEach((route: any, index: number) => {
      store.commit('app/changeTagsView', {
        index,
        tag: {
          ...route,
          title: getTitle(route)
        }
      })
    })
  },
  // 个人信息接口 语言变化
  () => {
    if (store.getters.token) {
      store.dispatch('user/loadUserInfo')
    }
  }
)
</script>

<style></style>
