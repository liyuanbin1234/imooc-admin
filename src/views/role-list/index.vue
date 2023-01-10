<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border size="small" style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="200">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="onDistributePermissionClick(row)"
              v-permission="['distributePermission']"
            >
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref<any[]>([])
const loadRoleList = async () => {
  allRoles.value = await getRoleList()
}
loadRoleList()
watchSwitchLang(loadRoleList)

const distributePermissionVisible = ref(false)
const selectRoleId = ref<string>('')
const onDistributePermissionClick = (row: any) => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}
</script>

<style lang="scss" scoped></style>
