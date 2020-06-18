<template>
  <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" width="60%">
    <el-form ref="form" :model="formData" :rules="rules" size="small" label-width="80px">
      <!-- 父级分类 -->
      <el-form-item label="父级分类" prop="label">
        <el-input v-model="formData.label" placeholder="父级分类" disabled style="width: 200px;" />
      </el-form-item>
      <!-- 分类名称 -->
      <el-form-item label="分类名称" prop="type_name">
        <el-input v-model="formData.type_name" placeholder="分类名称" style="width: 250px;" />
      </el-form-item>
      <!-- 封面图 顶级分类不需要上传图片-->
      <el-form-item label="封面图" prop="imgUrl" v-if="formData.pid !== 0">
        <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
          <el-button type="primary" v-else>点击上传</el-button>
        </el-upload>
      </el-form-item>
      <!-- 课程分类 -->
      <el-form-item label="课程分类" prop="is_platform">
        <el-radio v-model="formData.is_platform" label="0" border>平台课程</el-radio>
        <el-radio v-model="formData.is_platform" label="1" border>其他</el-radio>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="数字越大越靠前" style="width: 250px;" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogMenu.show = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="dialogMenu.show = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogMenu: Object,
    formData: Object
  },
  data() {
    return {
      hideUpload: false,
      key: 'file',
      rules: {
        type_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],

        is_platform: [
          { required: true, message: '请选择课程分类', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请排序,数字越大越靠前', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    handleAvatarSuccess(res, file, fileList) {
      this.formData.imgUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是JPG或者PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },

  },
}
</script>

<style lang="scss" scoped>
.imgUrl {
  width: 270px;
  height: 120px;
}
</style>