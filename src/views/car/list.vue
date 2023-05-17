<script lang="ts" setup>
import { getCurrentInstance, nextTick, reactive, ref, watch } from "vue"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { CirclePlus, RefreshRight } from "@element-plus/icons-vue"
import * as BrandApi from "@/api/car/brand"
import * as CountryApi from "@/api/car/country"
import * as PowerTypeApi from "@/api/car/power-type"
import * as CarTypeApi from "@/api/car/car-type"
import * as CarApi from "@/api/car/post"
import { defaultCarPost, IBrand, ICar, ICarType, ICountry, IPowerType } from "@/api/car/types"
import { usePagination } from "@/hooks/usePagination"
import { fileListToPictureField, pictureFieldToFileList } from "@/utils/image"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const uploadApi = reactive(import.meta.env.VITE_IMAGE_UPLOAD_API)
const imgBase = reactive(import.meta.env.VITE_IMAGE_BASE_API)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const brandList = ref<IBrand[]>([])
BrandApi.getBrands().then((res) => (brandList.value = res.data))
const powerTypeList = ref<IPowerType[]>([])
PowerTypeApi.getPowerTypes().then((res) => (powerTypeList.value = res.data))

const carTypeList = ref<ICarType[]>([])
CarTypeApi.getCarTypes().then((res) => (carTypeList.value = res.data))

// #region 图片上传
const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
const pictureFileList = ref([])

const beforeImageUpload = (rawFile) => {
  const { type, size } = rawFile
  if (!allowedTypes.includes(type)) {
    ElMessage.error("图片格式不支持！")
    return false
  }

  if (size > 2 * 1024 * 1024) {
    ElMessage.error("图片必须小于2MB")
    return false
  }

  return true
}
// #endregion

//#region 提交表单
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive(defaultCarPost)
const formRules: FormRules = reactive({
  postName: [{ required: true, message: "请填写车型名称", trigger: "blur" }],
  origionalPrice: [{ required: true, message: "请填写车原价", trigger: "blur" }],
  price: [{ required: true, message: "请填写出价", trigger: "blur" }],
  deposit: [{ required: true, message: "请填写定金", trigger: "blur" }],
  brand: [{ required: true, message: "请选择汽车品牌", trigger: "change" }],
  carTypeId: [{ required: true, message: "请选择车型", trigger: "change" }],
  powerTypeId: [{ required: true, message: "请选择能源类型", trigger: "change" }],
  color: [{ required: true, message: "请填写车颜色", trigger: "blur" }],
  age: [{ required: true, message: "请填写车龄", trigger: "blur" }],
  km: [{ required: true, message: "请填写里程数", trigger: "blur" }],
  displacement: [{ required: true, message: "请填写排量", trigger: "blur" }],
  seat: [{ required: true, message: "请填写座位数", trigger: "blur" }],
  region: [{ required: true, message: "请填写上牌地区", trigger: "blur" }],
  driver: [{ required: true, message: "请填写驱动类型", trigger: "blur" }],
  tradeCount: [{ required: true, message: "请填写过户次数", trigger: "blur" }]
})
const handleSubmit = () => {
  formRef.value?.validate((valid: boolean) => {
    if (!valid) {
      return false
    }
    formData.carImage = fileListToPictureField(pictureFileList.value)
    if (!formData.postId) {
      // 新增
      CarApi.addCarPost(formData).then((res) => {
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
      CarApi.editCarPost(formData).then((res) => {
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
  })
}

const resetForm = () => {
  Object.assign(formData, {
    age: undefined,
    brand: "",
    carBrand: { brandId: "", brandName: "", brandCountryId: "" },
    carImage: "",
    carPowerType: { powerTypeId: "", powerTypeName: "" },
    carType: { typeId: "", typeName: "" },
    carTypeId: "",
    color: "",
    deposit: undefined,
    description: "",
    displacement: undefined,
    driver: undefined,
    km: undefined,
    ownerId: "",
    origionalPrice: undefined,
    postId: "",
    postName: "",
    powerTypeId: "",
    price: undefined,
    region: "",
    seat: undefined,
    status: 0,
    tradeCount: undefined,
    user: {
      id: "",
      name: "",
      avatar: "",
      token: "",
      phone: "",
      level: 0,
      createDate: "",
      updateDate: "",
      roleId: "",
      addrId: ""
    }
  })
  pictureFileList.value = []
}
//#endregion

//#region 删
const handleDelete = (row: ICar) => {
  if (!row.postId) {
    ElMessage.error("无法删除该二手车！")
    return
  }
  ElMessageBox.confirm(`您确定删除【${row.postName}】吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    CarApi.delCarPost(row.postId).then((res) => {
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
const handleUpdate = (row: ICar) => {
  Object.assign(formData, row)
  pictureFileList.value = pictureFieldToFileList(row.carImage)
  dialogVisible.value = true
}
//#endregion

//#region 查
const carList = ref<ICar[]>([])
const countryList = ref<ICountry[]>([])

CountryApi.getCountrys().then((res) => (countryList.value = res.data))
const getTableData = async () => {
  loading.value = true
  try {
    const res = await CarApi.getList(paginationData.currentPage, paginationData.pageSize)
    carList.value = res.data.records
    paginationData.total = res.data.total
    carList.value.forEach((v: any) => {
      v.srcList = v.carImage.split(",")
      for (let i = 0; i < v.srcList.length; i++) {
        v.srcList[i] = imgBase + v.srcList[i]
      }
    })
  } catch (error) {
    console.error(error)
    carList.value = []
  } finally {
    loading.value = false
  }
}
getTableData()
//#endregion
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">发布二手车</el-button>
        </div>
        <div>
          <el-tooltip content="刷新表格">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="carList" style="width: 100%" row-key="id" border>
          <el-table-column prop="postId" label="发布 ID" align="center" />
          <el-table-column prop="postName" label="发布标题" min-width="170px" />
          <el-table-column label="金额" min-width="150px">
            <template #default="scope">
              <div>车原价：￥{{ scope.row.origionalPrice }}</div>
              <div>价格：￥{{ scope.row.price }}</div>
              <div>定金：￥{{ scope.row.deposit }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="postName" label="图片" min-width="160px" align="center">
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.srcList[0]"
                :zoom-rate="1.2"
                :preview-src-list="scope.row.srcList"
                :initial-index="4"
                fit="cover"
                :preview-teleported="true"
              />
              <div>共{{ scope.row.srcList.length }}张(点击图片查看)</div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="postName" label="车主信息" min-width="140px">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                车主头像：
                <el-image
                  style="width: 50px; height: 50px; border-radius: 5px; margin-bottom: 5px"
                  :src="imgBase + scope.row.user.avatar"
                />
              </div>
              <div>车主名：{{ scope.row.user.name }}</div>
              <div style="margin: 10px 0">车主联系方式：{{ scope.row.user.phone }}</div>
            </template>
          </el-table-column> -->
          <el-table-column prop="color" label="颜色" min-width="60px" align="center" />
          <el-table-column prop="age" label="车龄" min-width="60px" align="center" />
          <el-table-column prop="km" label="里程数/km" min-width="95px" align="center" />
          <el-table-column prop="displacement" label="排量(L)" min-width="70px" align="center" />
          <el-table-column prop="seat" label="座位数" min-width="70px" align="center" />
          <el-table-column prop="region" label="上牌地区" min-width="85px" align="center" />
          <el-table-column prop="driver" label="驱动" min-width="60px" align="center" />
          <el-table-column prop="tradeCount" label="过户记录" align="center" min-width="90px" />
          <el-table-column prop="createDate" label="发布时间" align="center" min-width="155px" />
          <el-table-column fixed="right" label="操作" min-width="170" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" icon="Edit" @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-button type="danger" text bg size="small" icon="Delete" @click="handleDelete(scope.row)"
                >删除</el-button
              >
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
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="!formData.postId ? '发布二手车' : '修改二手车'"
      @close="resetForm"
      width="900px"
    >
      <el-form
        :model="formData"
        ref="formRef"
        :rules="formRules"
        label-position="left"
        label-width="80px"
        size="default"
        @submit.prevent
      >
        <el-scrollbar height="500px">
          <div class="card-container">
            <el-form-item label="二手车 ID" v-if="formData.postId" label-width="100px">
              <el-text>{{ formData.postId }}</el-text>
            </el-form-item>
            <el-form-item label="车型" prop="postName" class="required">
              <el-input
                v-model="formData.postName"
                type="text"
                clearable
                placeholder="请输入二手车型号（如：宝马i4 2022款 eDrive40）"
              />
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="购入原价" prop="origionalPrice" class="required">
                  <el-input
                    step="500"
                    v-model="formData.origionalPrice"
                    type="number"
                    placeholder="请输入车原价"
                    min="0"
                  >
                    <template #suffix> 元 </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="售出定金" prop="deposit" class="required">
                  <el-input step="500" v-model="formData.deposit" type="number" placeholder="请输入定金" min="0">
                    <template #suffix> 元 </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="售出价格" prop="price" class="required">
                  <el-input step="500" v-model="formData.price" type="number" placeholder="请输入出价" min="0">
                    <template #suffix> 元 </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="汽车品牌" prop="brand" class="required">
                  <el-select v-model="formData.brand" class="full-width-input" clearable placeholder="请选择汽车品牌">
                    <el-option
                      v-for="item in brandList"
                      :key="item.brandId"
                      :label="item.brandName"
                      :value="item.brandId"
                    />
                  </el-select> </el-form-item
              ></el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="车型" prop="carTypeId" class="required">
                  <el-select v-model="formData.carTypeId" class="full-width-input" clearable placeholder="请选择车型">
                    <el-option
                      v-for="item in carTypeList"
                      :key="item.typeId"
                      :label="item.typeName"
                      :value="item.typeId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="能源类型" prop="powerTypeId" class="required">
                  <el-select
                    v-model="formData.powerTypeId"
                    class="full-width-input"
                    clearable
                    placeholder="请选择能源类型"
                  >
                    <el-option
                      v-for="item in powerTypeList"
                      :key="item.powerTypeId"
                      :label="item.powerTypeName"
                      :value="item.powerTypeId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="车颜色" prop="color" class="required">
                  <el-input v-model="formData.color" type="text" placeholder="请输入车的颜色(如：黑色)" />
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="车龄" prop="age" class="required">
                  <el-input step="0.1" v-model="formData.age" type="number" placeholder="请输入车龄" min="0">
                    <template #suffix> 年 </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="里程数" prop="km" class="required">
                  <el-input step="500" v-model="formData.km" type="number" placeholder="请输入车的里程数" min="0">
                    <template #suffix> KM </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="排量(L)" prop="displacement" class="required">
                  <el-input
                    step="0.1"
                    v-model="formData.displacement"
                    type="number"
                    placeholder="请输入排量(L)"
                    min="0"
                  >
                    <template #suffix> L </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="座位数" prop="seat" class="required">
                  <el-input v-model="formData.seat" type="number" placeholder="请输入座位数" min="0">
                    <template #suffix> 个 </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="上牌地区" prop="region" class="required">
                  <el-input v-model="formData.region" type="text" placeholder="请输入上牌地区" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="驱动" prop="driver" class="required">
                  <el-input v-model="formData.driver" type="number" placeholder="请输入驱动" min="0">
                    <template #suffix> 驱 </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="过户记录" prop="tradeCount" class="required">
                  <el-input v-model="formData.tradeCount" type="number" placeholder="请输入过户记录" min="0">
                    <template #suffix> 次 </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="图片">
              <el-upload
                :action="uploadApi"
                v-model:file-list="pictureFileList"
                :before-upload="beforeImageUpload"
                list-type="picture-card"
                show-file-list
                :limit="9"
              >
                <template #default
                  ><el-icon><Plus /></el-icon></template
              ></el-upload>
            </el-form-item>
          </div>
        </el-scrollbar>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">发布</el-button>
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
