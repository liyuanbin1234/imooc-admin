<template>
  <upload-excel
    :beforeUpload="beforeUpload"
    :onSuccess="onSuccess"
  ></upload-excel>
</template>

<script setup lang="ts">
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface ExcelData {
  header: any[]
  results: any[]
}

/**
 * 上传前的回调
 * @param rowFile 要上传的文件
 */
const beforeUpload = (rowFile: File) => {
  if (rowFile) return true
}

const i18n = useI18n()
const router = useRouter()
/**
 * 成功后的回调
 * @param excelData 解析后的表格数据
 */
const onSuccess = async (excelData: ExcelData) => {
  const uploadData = generateData(excelData.results)
  await userBatchImport(uploadData)
  ElMessage.success({
    message: excelData.results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}

/**
 * 处理为接口需要的数据格式
 */
const generateData = (results: any[]): any[] => {
  const arr: any[] = []
  results.forEach((item: any) => {
    const userInfo: any = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
