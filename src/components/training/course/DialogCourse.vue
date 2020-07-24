<template>
  <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" width="60%" @close='hanldclose'>
    <el-form ref="form" :model="formData" :rules="rules"  label-width="80px">
      <!-- 课程分类 -->
      <el-form-item label="课程分类" prop="type">
        <el-cascader v-model="formData.type" :options="options" @change="handleChange" :props="props" ref="cascader" style="width:'300px'"></el-cascader>
      </el-form-item>
      <!-- 课程价格 -->
      <el-form-item label="课程价格" prop="course_price">
        <el-input-number v-model.number="formData.course_price" placeholder='单位(元)、0元为免费' :min="0" :max="9999" controls-position="right" style="width: 200px;" />
        <span class="tishi">0元代表免费,最高为9999元</span>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model.number="formData.sort" placeholder='数字越大越靠前' :min="0" :max="999" controls-position="right" style="width: 200px;" />
        <span class="tishi">数字越大越靠前</span>
      </el-form-item>
      <!-- 封面图 -->
      <el-form-item label="封面图" prop="imgUrl">
        <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
          <el-button type="primary" v-else>点击上传</el-button> 
          <span class="tishi block">建议尺寸《750*460》</span>
        </el-upload>
      </el-form-item>
      <!-- 证书价格 -->
      <el-form-item label="证书价格" prop="zhengshu_price">
        <el-input-number v-model.number="formData.zhengshu_price" placeholder='单位(元)' :min="1" :max="9999" controls-position="right" style="width: 200px;" />
          <span class="tishi">单位元，建议为整数</span>
      </el-form-item>
      <!-- 虚拟购买量 -->
      <el-form-item label="虚拟购买" prop="false_number">
        <el-input-number v-model.number="formData.false_number" placeholder='请输入虚拟购买量' :min="0" :max="9999" controls-position="right" style="width: 200px;" />
          <span class="tishi">虚拟人数会和实际购买人数相加</span>
      </el-form-item>
      <!-- 拓展必修课数量 -->
      <el-form-item label="拓展必修" prop="tuozhan_number">
        <el-input-number v-model.number="formData.tuozhan_number" placeholder='请输入拓展必修课数量' :min="0" :max="9999" controls-position="right" style="width: 200px;" />
          <span class="tishi">为0代表没有限制,拓展必修课数量只能增加不能减少</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  style="width:200px">确认提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      key: 'file',
      rules: {
        type: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        course_price: [
          { required: true, message: '请填写课程价格', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请排序', trigger: 'blur' }
        ],
        zhengshu_price: [
          { required: true, message: '请输入证书价格', trigger: 'blur' }
        ],
        false_number: [
          { required: true, message: '请输入虚拟购买量', trigger: 'blur' }
        ],
        tuozhan_number: [
          { required: true, message: '请输入拓展必修课', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请输入拓展必修课', trigger: 'blur' }
        ],

      },
      options: [
        {
          id: 1,
          type_name: '康复训练师',
          children: [{
            id: 2,
            type_name: '言语-语言职业认证课程',
            children: [{
              id: 3,
              type_name: '初级认证',
            }, {
              id: 4,
              type_name: '中级认证'
            }]
          }]
        }],
      props: {
        value: "id",
        label: "type_name"
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    hanldclose() {
      this.formData.type = []
    },
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
  props: {
    dialogMenu: Object,
    formData: Object
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-cascader {
  width: 380px;
}
.tishi{
  color: #999;
  font-size: 12px;
  margin-left: 10px;
}
.block{
  display: block;
}
.imgUrl{
  width:200px;
}
</style>