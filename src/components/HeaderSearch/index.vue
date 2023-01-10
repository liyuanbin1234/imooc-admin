<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon
      id="guide-search"
      class="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item.path"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElSelect } from 'element-plus'
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'
import Fuse from 'fuse.js'

const router = useRouter()
// 数据源
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})
// 搜索库
let fuse: any = null

const initFuse = (searchPool: object[]) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref<InstanceType<typeof ElSelect>>()
const onShowClick = () => {
  isShow.value = !isShow.value
}

const search = ref('')
// 搜索结果
const searchOptions = ref<any[]>([])
// 自定义搜索方法
const querySearch = (query: string) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 选中项改变
const onSelectChange = (item: any) => {
  router.push(item)
}

watch(isShow, (val) => {
  if (val) {
    headerSearchSelectRef.value?.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 关闭搜索框
const onClose = () => {
  headerSearchSelectRef.value?.blur()
  searchOptions.value = []
  isShow.value = false
}

watchSwitchLang((): void => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
