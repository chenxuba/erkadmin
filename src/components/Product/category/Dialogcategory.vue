<template>
  <el-dialog :title="Dialogcategory.title" :visible.sync="Dialogcategory.show" width="60%" @open='openDialog'>
    <el-form ref="form" :model="formData" :rules="rules" label-width="130px">
      <!-- 父级分类 title -->
      <el-form-item label="父级分类" prop="label">
        <el-input v-model="formData.title" placeholder="父级分类" disabled style="width: 200px;" />
      </el-form-item>
      <!-- 分类名称 type_name -->
      <el-form-item label="分类名称" prop="type_name">
        <el-input v-model="formData.type_name" placeholder="分类名称" style="width: 250px;" />
      </el-form-item>
      <!-- 是否禁用 -->
      <!-- <div>
        <el-form-item label="是否禁用" prop="disabled">
          <el-radio-group v-model="formData.disabled">
            <el-radio-button :label="0">是</el-radio-button>
            <el-radio-button :label="1">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div> -->
      <!-- 推荐到首页 -->
      <div>
        <el-form-item label="推荐到首页" prop="is_index">
          <el-radio-group v-model="formData.is_index">
            <el-radio-button :label="1">是</el-radio-button>
            <el-radio-button :label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 排序 sort -->
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="数字越大越靠前" style="width: 250px;" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('form')">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getcourseCategory, AddcourseCategory ,EditcourseCategory} from "@/api/product";
export default {
  props: {
    Dialogcategory: Object,
    formData: Object
  },
  data() {
    return {
      key: 'file',
      options: [],
      rules: {
        type_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请排序,数字越大越靠前', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.Dialogcategory.option == 'add') {
            const data = {
              p_id: this.formData.p_id,
              type_name: this.formData.type_name,
              is_index: this.formData.is_index,
              sort: this.formData.sort,
            }
            AddcourseCategory(data).then(res => {
              console.log(res);
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success'
                });
                this.Dialogcategory.show = false
                this.$emit("addok")
              }
            })
          } else {
            //修改
            const data = {
              p_id: this.formData.p_id,
              type_name: this.formData.type_name,
              is_index: this.formData.is_index,
              sort: this.formData.sort,
            }
            EditcourseCategory(data, this.formData.id).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                });
                this.Dialogcategory.show = false
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
      this.Dialogcategory.show = false
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
    getcourseCategory().then(res => {
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