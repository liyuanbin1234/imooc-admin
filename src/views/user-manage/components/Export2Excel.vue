<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.title')"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { getUserManageAllList } from '@/api/user-manage'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filters/index'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 导出文件名
const i18n = useI18n()
const excelName = ref('')
let exportDefaultName = i18n.t('msg.excel.defaultName')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.watch.defaultName')
  excelName.value = exportDefaultName
})

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

const loading = ref(false)
// 确定导出
const onConfirm = async () => {
  loading.value = true
  const { list: allUser } = await getUserManageAllList()
  const data = formatJson(USER_RELATIONS, allUser)
  const excel = await import('@/utils/Export2Excel')
  excel.export_json_to_excel({
    // 表头
    header: Object.keys(USER_RELATIONS),
    // 表体
    data,
    // 文件名
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
  loading.value = false

  // 关闭dialog
  closed()
}

// 将数组转化为二维数组
const formatJson = (header: any, rows: any[]) => {
  // map 会返回新数组，不会改变原数组
  return rows.map((item) => {
    return Object.keys(header).map((key) => {
      // 角色特殊处理
      if (header[key] === 'role') {
        const role = item[header[key]]
        return JSON.stringify(role.map((role: any) => role.title))
      }
      // 时间特殊处理
      if (header[key] === 'openTime') {
        return dateFilter(item[header[key]])
      }
      return item[header[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
