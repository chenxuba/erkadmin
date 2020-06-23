<template>
  <div class="dialoguser">
    <el-dialog :title="dialogUser.title" :visible.sync="dialogUser.show" :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
      <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="66px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="formData.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="formData.nickName" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0;" label="角色" prop="roles">
          <el-select v-model="formData.roles" placeholder="请选择" style="width:179px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.enabled">
            <el-radio label="1">激活</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="hanldcancel">取消</el-button>
        <el-button type="primary" size="small" @click="hanldconfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'dialoguser',
  props: {
    dialogUser: Object,
    formData: Object
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        roles: [{ required: true, message: '请选择角色', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 取消
    hanldcancel(){
      this.dialogUser.show = false
    },
    // 确认
    hanldconfirm(){
      console.log(this.formData);
    }
  },
  components: {

  },
  mounted() {

  },

}
</script>

<style lang="scss" scoped>
</style>