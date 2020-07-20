<template>
  <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" width="60%" @open='openDialog'>
    <el-form ref="form" :model="formData" :rules="rules"  label-width="130px">
      <!-- 父级分类 title -->
      <el-form-item label="父级分类" prop="label">
        <el-input v-model="formData.title" placeholder="父级分类" disabled style="width: 200px;" />
      </el-form-item>
      <!-- 分类名称 type_name -->
      <el-form-item label="分类名称" prop="type_name">
        <el-input v-model="formData.type_name" placeholder="分类名称" style="width: 250px;" />
        <!-- <span style="font-size:12px;">该分类是大分类，例如：康复训练师、康复评估师</span>
        <span style="font-size:12px;">该分类是课程的名字</span> -->
      </el-form-item>
      <!-- 封面图 顶级分类不需要上传图片 imgUrl edit -->
      <div v-if="dialogMenu.option == 'edit'">
        <el-form-item label="封面图" prop="imgUrl" v-if="formData.label == 2 || formData.label == 3">
          <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
            <el-button type="primary" v-else>点击上传</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <!-- 封面图 顶级分类不需要上传图片 imgUrl  add -->
      <div v-if="dialogMenu.option == 'add'">
        <el-form-item label="封面图" prop="imgUrl" v-if="formData.label == 1 || formData.label == 2">
          <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
            <el-button type="primary" v-else>点击上传</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <!-- 课程分类 is_platform -->
      <el-form-item label="课程分类" prop="is_platform">
        <el-radio-group v-model="formData.is_platform">
          <el-radio-button label="0">平台课程</el-radio-button>
          <el-radio-button label="1">其他</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 是否是拓展课程 is_course 编辑的时候 -->
      <div v-if="dialogMenu.option == 'edit'">
        <el-form-item label="是否是拓展课程" prop="is_course" v-if="formData.label == 4">
          <el-radio-group v-model="formData.is_course">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 是否是拓展课程 is_course 添加的时候 -->
      <div v-if="dialogMenu.option == 'add'">
        <el-form-item label="是否是拓展课程" prop="is_course" v-if="formData.label == 3">
          <el-radio-group v-model="formData.is_course">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 排序 sort -->
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="数字越大越靠前" style="width: 250px;" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="resetForm('form')">取 消</el-button>
      <el-button  type="primary" @click="submit('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getcourseType, AddcourseType, PutcourseType } from "@/api/training";
export default {
  props: {
    dialogMenu: Object,
    formData: Object
  },
  data() {
    return {
      key: 'file',
      options: [],
      rules: {
        type_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        is_course: [{ required: true, message: '请选择是否是拓展课程', trigger: 'change' }],
        is_platform: [{ required: true, message: '请选择课程分类', trigger: 'blur' }],
        is_tuozhan: [{ required: true, message: '请选择是否是拓展课程', trigger: 'change' }],
        sort: [{ required: true, message: '请排序,数字越大越靠前', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请上传封面', trigger: 'blur' }],
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
    // 提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogMenu.option == 'add') {
            const data = {
              p_id: this.formData.p_id,
              type_name: this.formData.type_name,
              thumb: this.formData.imgUrl,
              is_platform: this.formData.is_platform,
              is_course: this.formData.is_tuozhan ? this.formData.is_tuozhan : '1',
              sort: this.formData.sort,
              disabled: 1
            }
            AddcourseType(data).then(res => {
              console.log(res);
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogMenu.show = false
                this.$emit("addok")
              }
            })
          } else {
            //修改
            const data = {
              p_id: this.formData.p_id,
              type_name: this.formData.type_name,
              thumb: this.formData.imgUrl,
              is_platform: this.formData.is_platform,
              is_course: this.formData.is_tuozhan ? this.formData.is_tuozhan : '1',
              sort: this.formData.sort,
              disabled: 1
            }
            PutcourseType(data,this.formData.id).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                });
                this.dialogMenu.show = false
                this.$emit("addok")
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogMenu.show = false
    },
    // 打开弹窗触发的方法，渲染上级类目的名字
    openDialog() {
      this.options.map(item => {
        if (this.formData.p_id == item.id) {
          this.formData.title = item.type_name
        }
        if (item.children) {
          item.children.map(items => {
            if (this.formData.p_id == items.id) {
              this.formData.title = items.type_name
            }
            if (items.children) {
              items.children.map(v => {
                if (this.formData.p_id == v.id) {
                  this.formData.title = v.type_name
                }
              })
            }
          })
        }
        if (this.formData.p_id == 0) {
          this.formData.title = '顶级类别'
        }

      })

    }
  },
  mounted() {
    getcourseType().then(res => {
      if (res.code == 0) {
        this.options = res.data.list
      }
    });
  },
}
</script>

<style lang="scss" scoped>
.imgUrl {
  width: 270px;
  height: 120px;
}
</style>