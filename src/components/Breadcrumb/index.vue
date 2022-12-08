<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ generateTitle(item.meta.title) }}
        </span>
        <!-- 可点击项 -->
        <span v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{ generateTitle(item.meta.title) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
import { generateTitle } from '@/utils/i18n'

// 路由数据
const route = useRoute()
const breadcrumbData = ref<RouteLocationMatched[]>([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => {
    return item.meta && item.meta.title
  })
}
// 监听路由变化
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true }
)

// 点击事件
const router = useRouter()
const onLinkClick = (item: any) => {
  router.push(item.path)
}

// 主题色会被更换
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  line-height: 50px;
  font-size: 16px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;

    &:hover {
      color: v-bind(linkHoverColor);
      cursor: pointer;
    }
  }

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
