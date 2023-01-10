<template>
  <div class="">
    <el-card>
      <el-table
        :data="permissionList"
        border
        size="small"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
      >
        <el-table-column
          :label="$t('msg.permission.name')"
          prop="permissionName"
          width="200"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.mark')"
          prop="permissionMark"
          width="200"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.desc')"
          prop="permissionDesc"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPermissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const permissionList = ref<any[]>([])
const loadPermissionList = async () => {
  permissionList.value = await getPermissionList()
}
loadPermissionList()
watchSwitchLang(loadPermissionList)
</script>

<style lang="scss" scoped></style>
