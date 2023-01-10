<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      show-checkbox
      check-strictly
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { getPermissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 获取所有权限
const allPermission = ref<any[]>([])
const loadPermissionsList = async () => {
  allPermission.value = await getPermissionList()
}
loadPermissionsList()
watchSwitchLang(loadPermissionsList)

// 默认属性
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 获取指定角色权限
const treeRef = ref<any>(null)
const loadRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) loadRolePermission()
  }
)
</script>
