<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button type="primary" :loading="loading" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

const prop = defineProps({
  // 上传前的回调
  beforeUpload: Function,
  // 成功的回调
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref<any>(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e: any) => {
  const files = e.target?.files
  const rowFile = files[0]
  if (!rowFile) return
  upload(rowFile)
}
/**
 * 触发上传事件
 * @param rowFile 上传的文件
 */
const upload = (rowFile: File) => {
  // 上传前把 excelUploadInput 的值删除
  excelUploadInput.value.value = null
  // 如果没有上传前的回调，直接进行后续操作
  if (!prop.beforeUpload) {
    readerData(rowFile)
    return
  }
  // 有上传的回调，回调为 true 时进行后续操作
  const before: boolean = prop.beforeUpload(rowFile)
  if (before) {
    readerData(rowFile)
  }
}
/**
 * 解析数据(异步)
 * @param rowFile 上传的文件
 */
const readerData = (rowFile: File) => {
  loading.value = true
  return new Promise((resolve) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()

    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = (e: any) => {
      // 1. 获取解析到的数据
      const data = e.target?.result

      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })

      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]

      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]

      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)

      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)

      // 7. 传入解析之后的数据
      generateData({ header, results })

      // 8. loading 处理
      loading.value = false

      // 9. 异步完成
      resolve({ header, results })
    }
    // 读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rowFile)
  })
}
/**
 * 根据导入的内容，生成数据
 * @param excelData 数据
 */
const generateData = (excelData: object) => {
  prop.onSuccess && prop.onSuccess(excelData)
}

// 拖拽上传
const handleDrop = (e: any) => {
  // 上传中跳过
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rowFile = files[0]
  if (!isExcel(rowFile)) {
    ElMessage.error('文件必须是 .xlsx，.xls， csv 格式')
    return
  }
  // 触发上传逻辑
  upload(rowFile)
}
const handleDragover = (e: any) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
