<template>
  <div class="dialoguser">
    <el-dialog :title="dialogUser.title" :visible.sync="dialogUser.show" destroy-on-close :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
      <el-form ref="form" :inline="true" :model="formData" :rules="rules"  label-width="66px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="formData.nickName" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0;" label="角色" prop="roleid">
          <el-select v-model="formData.roleid" placeholder="请选择" style="width:179px">
            <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.enabled">
            <el-radio label="1">激活</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <!-- <p style="text-align: center;" v-else>超级管理员不支持修改</p> -->
      <div slot="footer" class="dialog-footer">
        <el-button  @click="hanldcancel('form')">取消</el-button>
        <el-button type="primary"  @click="hanldconfirm('form')" v-if="formData.id != 1">确认</el-button>
        <el-button type="primary"  @click="pwdAdmin('form')" v-else>确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRole, adduser, edituser } from "@/api/system/index";
export default {
  name: 'dialoguser',
  props: {
    dialogUser: Object,
    formData: Object
  },
  data() {
    return {
      options: [],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        roleid: [{ required: true, message: '请选择角色', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 取消
    hanldcancel(formName) {
       this.$refs[formName].resetFields();
      this.dialogUser.show = false
    },
    // 确认
    hanldconfirm(formName) {
      let data = {
        username: this.formData.username,
        nickname: this.formData.nickName,
        avatar: "http://erkong.ybc365.com/b4d6f202006231845557553.gif",
        status: this.formData.enabled,
        group_id: this.formData.roleid
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogUser.option == 'add') {
            adduser(data).then(res => {
              if (res.code == 0) {
                this.$message.success("创建用户成功")
                this.dialogUser.show = false
                this.$emit("addok")
              }
            })
          } else {
            //编辑
            edituser(this.formData.id, data).then(res => {
              if (res.code == 0) {
                this.$message.success("编辑用户成功")
                this.dialogUser.show = false
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
    //修改超级管理员信息，需要输入密码
    pwdAdmin(formName) {
      this.$prompt('请输入超级密码', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType:'password',
        inputPlaceholder:"请输入超级密码方可修改超级管理员",
      }).then(({ value }) => {
        console.log(value);
        if (value == 'ybc365@@') {
          let data = {
            username: this.formData.username,
            nickname: this.formData.nickName,
            avatar: "http://erkong.ybc365.com/b4d6f202006231845557553.gif",
            status: this.formData.enabled,
            group_id: this.formData.roleid
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //编辑
              edituser(this.formData.id, data).then(res => {
                if (res.code == 0) {
                  this.$message.success("编辑用户成功")
                  this.dialogUser.show = false
                  this.$emit("addok")
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '超级密码输入错误'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //获取角色列表
    getRoles() {
      getRole().then(res => {
        this.options = (res.data.list);
      })
    }
  },
  components: {

  },
  mounted() {
    this.getRoles()
  },

}
</script>

<style lang="scss" scoped>
</style>