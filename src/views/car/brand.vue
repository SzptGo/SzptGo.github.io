<script lang="ts" setup>
import { reactive, ref } from "vue"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { CirclePlus, RefreshRight } from "@element-plus/icons-vue"
import * as BrandApi from "@/api/car/brand"
import * as CountryApi from "@/api/car/country"
import { IBrand, ICountry } from "@/api/car/types"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)

//#region 提交表单
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  brandId: "",
  brandName: "",
  brandCountryId: ""
})
const formRules: FormRules = reactive({
  brandName: [{ required: true, trigger: "blur", message: "请输入品牌名称" }],
  brandCountryId: [{ required: true, trigger: "blur", message: "请选择品牌所属国家" }]
})
const handleSubmit = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (!formData.brandId) {
        // 新增
        BrandApi.addBrand(formData).then((res) => {
          if (res.data) {
            getTableData()
            resetForm()
            dialogVisible.value = false
            ElMessage.success("新增成功")
          } else {
            ElMessage.error("新增失败")
          }
        })
      } else {
        // 修改
        BrandApi.editBrand(formData).then((res) => {
          if (res.data) {
            getTableData()
            resetForm()
            dialogVisible.value = false
            ElMessage.success("修改成功")
          } else {
            ElMessage.error("修改失败")
          }
        })
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  formData.brandName = ""
  formData.brandId = ""
  formData.brandCountryId = ""
}
//#endregion

//#region 删
const handleDelete = (row: IBrand) => {
  if (!row.brandId) {
    ElMessage.error("无法删除该品牌！")
    return
  }
  ElMessageBox.confirm(`您确定删除【${row.brandName}】吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    BrandApi.delBrand(row.brandId).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const handleUpdate = (row: IBrand) => {
  formData.brandName = row.brandName
  formData.brandId = row.brandId
  formData.brandCountryId = row.brandCountryId
  dialogVisible.value = true
}
//#endregion

//#region 查
const brandList = ref<IBrand[]>([])
const countryList = ref<ICountry[]>([])
CountryApi.getCountrys().then((res) => (countryList.value = res.data))
const getTableData = async () => {
  loading.value = true
  try {
    const res = await BrandApi.getBrands()
    brandList.value = res.data
  } catch (error) {
    console.error(error)
    brandList.value = []
  } finally {
    loading.value = false
  }
}
const getCountryNameById = (countryId) => {
  console.log(countryId)
  for (const c of countryList.value) {
    if (c.countryId === countryId) {
      return c.countryName
    }
  }
}
getTableData()
//#endregion
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增品牌</el-button>
        </div>
        <div>
          <el-tooltip content="刷新表格">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <el-table :data="brandList" style="width: 100%" row-key="id" border>
        <el-table-column prop="brandId" label="品牌ID" />
        <el-table-column prop="brandName" label="品牌名称" />
        <el-table-column label="所属国家">
          <template #default="scope">
            {{ getCountryNameById(scope.row.brandCountryId) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170" align="center">
          <template #default="scope">
            <el-button type="primary" text bg size="small" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="danger" text bg size="small" icon="Delete" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增 -->
    <el-dialog v-model="dialogVisible" :title="!formData.brandId ? '新增品牌' : '修改品牌'" @close="resetForm">
      <el-form
        :model="formData"
        ref="formRef"
        :rules="formRules"
        label-position="left"
        label-width="80px"
        size="default"
        @submit.prevent
      >
        <div class="card-container">
          <el-form-item label="品牌 ID" v-if="formData.brandId">
            <el-text>{{ formData.brandId }}</el-text>
          </el-form-item>
          <el-form-item label="品牌名" prop="brandName" class="required">
            <el-input v-model="formData.brandName" type="text" clearable placeholder="请输入品牌名" />
          </el-form-item>
          <el-form-item label="所属国家" prop="brandCountryId" class="required">
            <el-select
              v-model="formData.brandCountryId"
              class="full-width-input"
              clearable
              placeholder="请选择品牌所属国家"
            >
              <el-option
                v-for="item in countryList"
                :key="item.countryId"
                :label="item.countryName"
                :value="item.countryId"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
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
</style>
