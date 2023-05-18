<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type IGetTableData } from "@/api/table/types/table"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Download, RefreshRight, Plus } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { IUser } from "@/api/login/types/login"
import { addUser, delUser, editUser, geUserList } from "@/api/login/index"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const imgBase = reactive(import.meta.env.VITE_IMAGE_BASE_API)
const uploadApi = reactive(import.meta.env.VITE_IMAGE_UPLOAD_API)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const roleIdOptions = reactive([
  {
    label: "普通用户",
    value: "0"
  },
  {
    label: " 管理员",
    value: "1"
  }
])

const handleAvatarSuccess = (res) => {
  formData.avatar = res.data
}
const beforeAvatarUpload = (file) => {
  const isImage = file.type === "image/jpeg" || file.type === "image/png"
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isImage) {
    ElMessage.error("上传头像图片只能是 JPG/PNG 格式!")
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!")
  }
  return isImage && isLt2M
}

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  id: undefined,
  phone: "",
  password: "",
  roleId: "0",
  avatar: "",
  mail: "",
  name: "",
  message: "",
  balance: undefined
})
//#region 校验
const formRules: any = reactive({
  phone: [
    { required: true, message: "请填写手机号", trigger: "blur" },
    { pattern: /^1[345789]\d{9}$/, message: "手机号格式不正确", trigger: "blur" }
  ],
  name: [{ required: true, message: "请填写用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请填写密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在6-20个字符之间", trigger: "blur" }
  ],
  message: [{ max: 50, message: "个人签名不能超过50个字符", trigger: "blur", required: false }],
  mail: [
    { required: true, message: "请填写邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" }
  ],
  roleId: [{ required: true, message: "请选择角色权限", trigger: "change" }],
  avatar: [{ required: true, message: "请上传图片", trigger: "change" }]
})
//#endregion
const handleCreate = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (formData.id === undefined) {
        addUser(formData).then((res) => {
          if (res.code === "200") {
            ElMessage.success("新增成功")
            dialogVisible.value = false
            getTableData()
          } else {
            ElMessage.error(res.msg)
          }
        })
      } else {
        //editUser
        editUser(formData).then((res) => {
          if (res.code === "200") {
            ElMessage.success("修改成功")
            dialogVisible.value = false
            getTableData()
          } else {
            ElMessage.error(res.msg)
          }
        })
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  Object.assign(formData, {
    id: undefined,
    phone: "",
    password: "",
    roleId: "0",
    avatar: "",
    mail: "",
    name: "",
    message: "",
    balance: undefined
  })
}
//#endregion

//#region 删
const handleDelete = (row: IUser) => {
  ElMessageBox.confirm(`正在删除用户：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    delUser(row.id).then((res) => {
      if (res.data) {
        ElMessage.success("删除成功")
        getTableData()
      } else {
        ElMessage.error("删除失败")
      }
    })
  })
}
//#endregion

//#region 改
const handleUpdate = (row: IUser) => {
  Object.assign(formData, row)
  formData.password = undefined
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<IUser[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  phone: ""
})
const getTableData = () => {
  loading.value = true
  geUserList().then((res) => {
    const data = res.data
    paginationData.total = data.total
    tableData.value = data.records
  })
  loading.value = false
}
const handleSearch = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
const handleRefresh = () => {
  getTableData()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="phone" label="用户名">
          <el-input v-model="searchData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="searchData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增用户</el-button>
        </div>
        <div>
          <el-tooltip content="刷新表格">
            <el-button type="primary" :icon="RefreshRight" circle @click="handleRefresh" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column prop="id" align="center" label="ID" />
          <el-table-column prop="name" label="头像" align="center">
            <template #default="scope">
              <el-avatar :size="60" :src="imgBase + scope.row.avatar">
                <Avatar />
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="用户名" align="center" />
          <el-table-column prop="roleId" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roleId === '0'" effect="plain">普通用户</el-tag>
              <el-tag v-if="scope.row.roleId === '1'" type="danger" effect="plain">管理员</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="mail" label="邮箱" align="center" />
          <!-- <el-table-column prop="status" label="等级" align="center">
            <template #default="scope">
              <el-tag>LV{{ scope.row.level }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="message" label="留言" align="center" />
          <el-table-column prop="balance" label="余额(￥)" align="center" />
          <el-table-column prop="createDate" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? '新增用户' : '修改用户'"
      @close="resetForm"
      width="500px"
    >
      <!-- 新增/修改 -->
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px" label-position="left">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.avatar" :src="imgBase + formData.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="formData.phone" placeholder="请输入" maxlength="11" />
        </el-form-item>
        <el-form-item prop="name" label="用户名">
          <el-input v-model="formData.name" placeholder="请输入昵称" maxlength="16" />
        </el-form-item>
        <el-form-item prop="password" label="密码" v-if="!formData.id">
          <el-input v-model="formData.password" type="password" placeholder="请输入" maxlength="20" />
        </el-form-item>

        <el-form-item prop="mail" label="邮箱">
          <el-input v-model="formData.mail" placeholder="请输入邮箱" maxlength="30" />
        </el-form-item>
        <el-form-item prop="balance" label="余额">
          <el-input v-model="formData.balance" placeholder="请输入余额" type="number" step="1" />
        </el-form-item>
        <el-form-item label="角色权限" prop="roleId">
          <el-select v-model="formData.roleId" class="full-width-input" clearable placeholder="角色">
            <el-option v-for="(item, index) in roleIdOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="message" label="个人签名">
          <el-input v-model="formData.message" placeholder="请输入个人签名" maxlength="50" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
