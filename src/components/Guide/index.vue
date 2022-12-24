<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import steps from './steps'

const i18n = useI18n()
let driver: any = null

// 初始化 driver
const initDriver = () => {
  driver = new Driver({
    // 是否可以点击蒙版关闭引导
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    doneBtnText: i18n.t('msg.guide.done')
  })
}

onMounted(() => {
  initDriver()
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}

watchSwitchLang(() => {
  initDriver()
})
</script>

<style lang="scss" scoped></style>
