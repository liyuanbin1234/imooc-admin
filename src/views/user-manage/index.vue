<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onUploadClick">{{
          $t('msg.excel.importExcel')
        }}</el-button>
        <el-button type="success">{{ $t('msg.excel.exportExcel') }} </el-button>
      </div>
    </el-card>
    <!-- table -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="#" type="index" />
        <!-- 姓名 -->
        <el-table-column :label="$t('msg.excel.name')" prop="username">
        </el-table-column>
        <!-- 联系方式 -->
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile">
        </el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template #default="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 开通时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default>
            <div>
              <el-button size="mini" type="primary">
                {{ $t('msg.excel.show') }}
              </el-button>
              <el-button size="mini" type="info">
                {{ $t('msg.excel.showRole') }}
              </el-button>
              <el-button size="mini" type="danger">
                {{ $t('msg.excel.remove') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        :total="total"
        layout="total, sizes, prev, next, pager, jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 请求数据
const loadUserManageList = async () => {
  const result: any = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
watchSwitchLang(loadUserManageList)
// onActivated：进入该页面时触发（只在 keep-alive 缓存的页面中生效）
onActivated(loadUserManageList)

// table 操作
const handleSizeChange = (currentSize: number) => {
  size.value = currentSize
  loadUserManageList()
}
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage
  loadUserManageList()
}

const router = useRouter()
// 上传按钮点击事件
const onUploadClick = () => {
  router.push('/user/import')
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
