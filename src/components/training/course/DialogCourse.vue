<template>
  <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" width="60%" destroy-on-close @open='dialogOpen' @close='hanldclose' :close-on-click-modal='false' :close-on-press-escape='false'>
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
      <!-- 课程分类 -->
      <el-form-item label="课程分类" prop="type">
        <el-cascader v-model="formData.type" size="small" :options="options" @change="handleChange" :props="props" ref="cascader" style="width:'300px'"></el-cascader>
      </el-form-item>
      <!-- 课程价格 -->
      <el-form-item label="课程价格" prop="course_price">
        <el-input-number v-model.number="formData.course_price" placeholder='单位(元)、0元为免费' :min="0" :max="99999" controls-position="right" style="width: 200px;" />
        <span class="tishi">0元代表免费,最高为99999元</span>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model.number="formData.sort" placeholder='数字越大越靠前' :min="0" :max="999" controls-position="right" style="width: 200px;" />
        <span class="tishi">数字越大越靠前</span>
      </el-form-item>
      <!-- 封面图 imgUrl -->
      <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*' checking='imgUrl' name='上传封面'></uploadImage>
      <!-- 封面图预览 -->
      <el-form-item label="封面预览" prop="imgUrl" v-if="isShow">
        <img :src="formData.imgUrl" alt="" width="30%">
      </el-form-item>
      <!-- 证书价格 -->
      <el-form-item label="证书价格" prop="zhengshu_price">
        <el-input-number v-model.number="formData.zhengshu_price" placeholder='单位(元)' :min="0" :max="9999" controls-position="right" style="width: 200px;" />
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
        <el-button type="primary" style="width:200px" @click="submit('form')">确认提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getcourseType, AddTrainingCourse, PuttrainingCourse } from "@/api/training/index";
import uploadImage from "@/components/Common/uploadImage";
export default {
  data() {
    return {
      isShow: true,
      rules: {
        type: [
          { required: true, message: '请选择分类', trigger: 'change' }
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
          { required: true, message: '请上传图片', trigger: 'change' }
        ],

      },
      options: [
        // {
        //   id: 1,
        //   type_name: '康复训练师',
        //   children: [{
        //     id: 2,
        //     type_name: '言语-语言职业认证课程',
        //     children: [{
        //       id: 3,
        //       type_name: '初级认证',
        //     }, {
        //       id: 4,
        //       type_name: '中级认证'
        //     }]
        //   }]
        // }
      ],
      props: {
        value: "id",
        label: "type_name"
      }
    }
  },
  methods: {
    handleChange(value) {
      this.formData.type_id = value[2]
    },
    hanldclose() {
      this.formData = {}
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
    // 获取分类列表
    getcourseType3() {
      getcourseType().then(res => {
        let obj = {}
        res.data.list.map(item => {
          obj.id = item.id
          obj.type_name = item.type_name
          obj.children = []
          if (item.children) {
            item.children.map(item => {
              let obj2 = {}
              obj2.id = item.id
              obj2.type_name = item.type_name
              obj2.children = []
              obj.children.push(obj2)
              if (item.children) {
                item.children.map(item => {
                  let obj3 = {}
                  obj3.id = item.id
                  obj3.type_name = item.type_name
                  obj2.children.push(obj3)
                })
              }
            })
          }
        })
        this.options.push(obj)
      })
    },
    //上传图片成功触发
    uploadSuccessImg(url) {
      this.formData.imgUrl = url
      this.isShow = false
    },
    // 确认提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogMenu.option == 'add') {
            let data = {
              type_id: this.formData.type_id,
              course_price: this.formData.course_price,
              sort: this.formData.sort,
              course_thumb: this.formData.imgUrl,
              certificate_price: this.formData.zhengshu_price,
              click_number: this.formData.false_number,
              expand_number: this.formData.tuozhan_number,
              is_vip: '0',
              is_svip: '0'
            }
            AddTrainingCourse(data).then(res => {
              this.$message.success('创建课程成功')
              this.dialogMenu.show = false
              this.$emit('update')
            })
          } else {
            let data = {
              type_id: this.formData.type_id,
              course_price: this.formData.course_price,
              sort: this.formData.sort,
              course_thumb: this.formData.imgUrl,
              certificate_price: this.formData.zhengshu_price,
              click_number: this.formData.false_number,
              expand_number: this.formData.tuozhan_number,
              is_vip: '0',
              is_svip: '0'
            }
            PuttrainingCourse(data, this.formData.id).then(res => {
              this.$message.success('修改课程成功')
              this.dialogMenu.show = false
              this.$emit('update')
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 弹窗出现后触发
    dialogOpen() {
      if (this.dialogMenu.option == 'add') {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  props: {
    dialogMenu: Object,
    formData: Object
  },
  components: {
    uploadImage,
  },
  mounted() {
    this.getcourseType3();
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-cascader {
  width: 380px;
}
.tishi {
  color: #999;
  font-size: 12px;
  margin-left: 10px;
}
.block {
  display: block;
}
.imgUrl {
  width: 200px;
}
</style>