<template>
  <el-dropdown
    v-bind="$attrs"
    class="theme"
    trigger="click"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

const selectColorVisible = ref<boolean>(false)

const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
