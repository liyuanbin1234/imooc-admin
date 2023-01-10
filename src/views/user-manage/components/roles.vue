<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in roleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button @click="onConfirm" type="primary">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { getRoleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'updateRoleSuccess'])

const i18n = useI18n()
const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((item) => {
    return roleList.value.find((role: any) => {
      return role.title === item
    })
  })
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emits('updateRoleSuccess')
  closed()
}
const closed = () => {
  emits('update:modelValue', false)
}

// 所有角色
const roleList = ref<any>([])
const loadRoleList = async () => {
  roleList.value = await getRoleList()
}
loadRoleList()
watchSwitchLang(loadRoleList)

// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const loadUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item: any): string => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val !== '') loadUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
