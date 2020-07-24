<template>
  <div class="dialogmenu">
    <el-dialog :title="dialogRoles.title" :visible.sync="dialogRoles.show" @open='openDialog' :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
      <el-form ref="form" :model="formData" :rules="rules"  label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" style="width: 380px;" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="描述信息" prop="desc">
          <el-input v-model="formData.desc" style="width: 380px;" rows="5" type="textarea" placeholder="请输入描述信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')" >取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, editRole } from "@/api/system/index";
export default {
  props: {
    dialogRoles: Object,
    formData: Object
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入描述信息', trigger: 'blur' }],
        status: [{ required: true, message: '请选择是否启用', trigger: 'blur' }],
      }
    }
  },
  methods: {
    //取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogRoles.show = false
    },
    //确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogRoles.option == 'add') {
            addRole({ title: this.formData.name, desc: this.formData.desc, status: this.formData.status }).then(res => {
              console.log(res);
              if (res.code == 0) {
                this.$message.success("添加成功")
                this.dialogRoles.show = false
                this.$emit('addOk')
              }
            })
          } else {
            editRole(this.formData.id, { title: this.formData.name, desc: this.formData.desc, status: this.formData.status }).then(res => {
              if (res.code == 0) {
                this.$message.success("修改成功")
                this.dialogRoles.show = false
                this.$emit('addOk')
              }
            })
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 弹窗打开的方法
    openDialog() { }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  overflow: auto;
}
</style>